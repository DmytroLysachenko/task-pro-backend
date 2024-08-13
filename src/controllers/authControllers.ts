import fs from 'node:fs/promises';
import jwt from 'jsonwebtoken';
import path from 'node:path';
import axios from 'axios';
import bcrypt from 'bcrypt';
import queryString from 'query-string';
import { nanoid } from 'nanoid';

import * as authServices from '../services/authServices';

import HttpError from '../helpers/HttpError';
import cloudinary from '../helpers/cloudinary';
import ctrlWrapper from '../decorators/ctrlWrapper';
import { env } from '../helpers/env';
import { sendMail } from '../helpers/sendEmail';

import { Controller } from '../types';

const registerUser: Controller = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await authServices.findUser({ email });

  if (user) {
    throw new HttpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const verificationToken = nanoid(12);

  const newUser = await authServices.registerUser({
    username,
    email,
    password: hashPassword,
    verificationToken,
  });

  const BASE_URL = env('BASE_URL');

  const data = {
    to: email,
    subject: 'Confirm your registration in TaskPro app',
    text: 'Press on the link to confirm your email',
    html: `Good day! Please click on the following link to confirm your account in TaskPro app. <a href="${BASE_URL}/auth/verify/${verificationToken}" target="_blank" rel="noopener noreferrer">Confirm my mail</a>`,
  };

  sendMail(data);

  res.json({
    status: 201,
    message: 'User successfully registered',
    data: {
      username: newUser.username,
      email: newUser.email,
    },
  });
};

const loginUser: Controller = async (req, res) => {
  const { email, password } = req.body;

  const ACCESS_JWT_SECRET = env('ACCESS_JWT_SECRET');
  const REFRESH_JWT_SECRET = env('REFRESH_JWT_SECRET');

  const user = await authServices.findUser({ email });

  if (!user) {
    throw new HttpError(400, 'Email or password invalid');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw new HttpError(400, 'Email or password invalid');
  }

  if (!user.isVerified) {
    throw new HttpError(
      403,
      'User mail is not verified, please check your mail for following instructions'
    );
  }

  const { _id } = user;

  await authServices.abortUserSession({ userId: _id });

  const payload = { id: _id };

  const accessToken = jwt.sign(payload, ACCESS_JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign(payload, REFRESH_JWT_SECRET, {
    expiresIn: '7d',
  });

  const newSession = await authServices.createSession({
    userId: _id,
    accessToken,
    refreshToken,
  });

  if (!newSession) {
    throw new HttpError(400, `Something went wrong during session creation`);
  }

  res.json({
    status: 200,
    data: {
      sid: newSession?._id,
      accessToken,
      refreshToken,
      user: {
        username: user?.username,
        email: user?.email,
        avatarUrl: user?.avatarUrl,
        theme: user?.theme,
      },
    },
  });
};

const logoutUser: Controller = async (req, res) => {
  const { _id } = req.user as { _id: string };
  await authServices.abortUserSession({ userId: _id });
  res.status(204).json({
    status: 204,
  });
};

const getCurrentUser: Controller = async (req, res) => {
  const { email, username, avatarUrl, theme } = req.user as {
    email: string;
    username: string;
    avatarUrl: string | null;
    theme: string;
  };

  res.json({
    status: 200,
    data: { username, email, avatarUrl, theme },
  });
};

const patchUser: Controller = async (req, res) => {
  const { username, email, password, theme } = req.body;
  const { _id } = req.user as {
    _id: unknown;
  };

  let hashPassword;
  let verificationToken;
  let isVerified;
  let avatarUrl;

  if (password) {
    hashPassword = await bcrypt.hash(password, 10);
  }

  if (email) {
    const userWithNewMail = await authServices.findUser({ email });
    if (userWithNewMail) {
      throw new HttpError(
        408,
        'Cannot change email to that which is already occupied.'
      );
    }

    const BASE_URL = env('BASE_URL');

    verificationToken = nanoid(12);
    isVerified = false;

    const data = {
      to: email,
      subject: 'Confirm your registration in TaskPro app',
      text: 'Press on the link to confirm your email',
      html: `Good day! Please click on the following link to confirm your account in TaskPro app. <a href="${BASE_URL}/auth/verify/${verificationToken}" target="_blank" rel="noopener noreferrer">Confirm my mail</a>`,
    };

    sendMail(data);
  }

  if (req?.file?.path) {
    try {
      const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
        folder: 'avatars',
      });

      avatarUrl = secure_url;

      await fs.unlink(req.file.path);
    } catch (error) {
      await fs.unlink(req.file.path);

      throw error;
    }
  }

  const newUser = await authServices.updateUser(
    { _id },
    {
      username,
      email,
      password: hashPassword,
      theme,
      avatarUrl,
      isVerified,
      verificationToken,
    }
  );

  res.json({
    status: 200,
    data: {
      username: newUser?.username,
      email: newUser?.email,
      theme: newUser?.theme,
      avatarUrl: newUser?.avatarUrl,
    },
  });
};

const verifyUser: Controller = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await authServices.findUser({
    verificationToken,
  });

  if (!user) {
    throw new HttpError(400, 'Invalid verification token');
  }

  if (user.isVerified) {
    throw new HttpError(400, 'Verification has already been passed');
  }

  await authServices.updateUser(
    { verificationToken },
    { verificationToken: 'User verified', isVerified: true }
  );

  const root = path.resolve('src', 'constants');

  res.sendFile('htmlPage.html', { root });
};

const resendVerifyMessage: Controller = async (req, res) => {
  const { email } = req.body;

  const user = await authServices.findUser({
    email,
  });

  if (!user) {
    throw new HttpError(400, 'Invalid verification token');
  }

  if (user.isVerified) {
    throw new HttpError(400, 'Verification has already been passed');
  }

  const verificationToken = nanoid(12);

  await authServices.updateUser({ email }, { verificationToken });

  const BASE_URL = env('BASE_URL');

  const data = {
    to: email,
    subject: 'Confirm your registration in TaskPro app',
    text: 'Press on the link to confirm your email',
    html: `Good day! Please click on the following link to confirm your account in TaskPro app. <a href="${BASE_URL}/auth/verify/${verificationToken}" target="_blank" rel="noopener noreferrer">Confirm my mail</a>`,
  };

  sendMail(data);

  res.json({
    status: 200,
    message: 'New verification email sent',
  });
};

const refreshTokens: Controller = async (req, res) => {
  const { sid } = req.body;
  const { authorization } = req.headers;

  const REFRESH_JWT_SECRET = env('REFRESH_JWT_SECRET');
  const ACCESS_JWT_SECRET = env('ACCESS_JWT_SECRET');

  if (!authorization) {
    throw new HttpError(401, `Authorization header not found`);
  }

  const [bearer, oldRefreshToken] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    throw new HttpError(401, 'Bearer not found');
  }

  const { id } = jwt.verify(
    oldRefreshToken,
    REFRESH_JWT_SECRET
  ) as jwt.JwtPayload;

  const currentSession = await authServices.abortSession({
    userId: id,
    _id: sid,
  });

  if (!currentSession) {
    throw new HttpError(401, 'Session not found');
  }

  const payload = { id };

  const accessToken = jwt.sign(payload, ACCESS_JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign(payload, REFRESH_JWT_SECRET, {
    expiresIn: '7d',
  });

  const newSession = await authServices.createSession({
    userId: id,
    accessToken,
    refreshToken,
  });

  res.json({
    status: 200,
    data: {
      sid: newSession?._id,
      accessToken: newSession?.accessToken,
      refreshToken: newSession?.refreshToken,
    },
  });
};

const googleAuth: Controller = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${env('BASE_URL')}/auth/google-redirect`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

const googleRedirect: Controller = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: env('GOOGLE_CLIENT_ID'),
      client_secret: env('GOOGLE_CLIENT_SECRET'),
      redirect_uri: `${env('BASE_URL')}/auth/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });

  const { data } = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const { email, name, picture, id } = data;

  const ACCESS_JWT_SECRET = env('ACCESS_JWT_SECRET');
  const REFRESH_JWT_SECRET = env('REFRESH_JWT_SECRET');

  const user = await authServices.findUser({ email });

  if (!user) {
    const hashPassword = await bcrypt.hash(id, 10);

    const newUser = await authServices.registerUser({
      username: name,
      email,
      password: hashPassword,
      verificationToken: null,
      isVerified: true,
      avatarUrl: picture,
    });

    const { _id } = newUser;
    const payload = { id: _id };

    const accessToken = jwt.sign(payload, ACCESS_JWT_SECRET, {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign(payload, REFRESH_JWT_SECRET, {
      expiresIn: '7d',
    });

    const newSession = await authServices.createSession({
      userId: _id,
      accessToken,
      refreshToken,
    });

    return res.redirect(
      `${env('FRONTEND_URL')}?sid=${newSession._id}&accessToken=${
        newSession.accessToken
      }&refreshToken=${newSession.refreshToken}`
    );
  }

  const { _id } = user;

  await authServices.abortUserSession({ userId: _id });

  const payload = { id: _id };

  const accessToken = jwt.sign(payload, ACCESS_JWT_SECRET, {
    expiresIn: '1h',
  });
  const refreshToken = jwt.sign(payload, REFRESH_JWT_SECRET, {
    expiresIn: '7d',
  });

  const newSession = await authServices.createSession({
    userId: _id,
    accessToken,
    refreshToken,
  });

  if (!newSession) {
    throw new HttpError(400, 'Something went wrong during session creation');
  }

  return res.redirect(
    `${env('FRONTEND_URL')}?sid=${newSession._id}&accessToken=${
      newSession.accessToken
    }&refreshToken=${newSession.refreshToken}`
  );
};

export default {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  verifyUser: ctrlWrapper(verifyUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  patchUser: ctrlWrapper(patchUser),
  resendVerifyMessage: ctrlWrapper(resendVerifyMessage),
  refreshTokens: ctrlWrapper(refreshTokens),
  googleAuth: ctrlWrapper(googleAuth),
  googleRedirect: ctrlWrapper(googleRedirect),
};
