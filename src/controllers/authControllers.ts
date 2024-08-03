import HttpError from '../helpers/HttpError';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { env } from '../helpers/env';
import jwt from 'jsonwebtoken';
import { Controller } from '../types';
import ctrlWrapper from '../helpers/ctrlWrapper';
import * as authServices from '../services/authServices';
import { sendMail } from '../helpers/sendEmail';

const registerUser: Controller = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await authServices.findUser({ email });

  if (user) {
    return HttpError(res, 409, 'Email already in use');
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
    subject: 'Confirm your registration in Contact List app',
    text: 'Press on the link to confirm your email',
    html: `Good day! Please click on the following link to confirm your account in Task-pro app. <a href="${BASE_URL}/auth/verify/${verificationToken}" target="_blank" rel="noopener noreferrer">Confirm my mail</a>`,
  };

  await sendMail(data);

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
  const JWT_SECRET = env('JWT_SECRET');
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) {
    return HttpError(res, 401, 'Email or password invalid');
  }

  if (!user.isVerified) {
    return HttpError(
      res,
      400,
      'User mail is not verified, please check your mail for following instructions'
    );
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    return HttpError(res, 401, 'Email or password invalid');
  }

  const { _id } = user;
  const payload = { id: _id };

  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

  const updUser = await authServices.updateUser(
    { _id },
    { accessToken, refreshToken }
  );
  res.json({
    status: 200,
    data: {
      accessToken,
      refreshToken,
      user: {
        username: updUser?.username,
        email: updUser?.email,
        avatarUrl: updUser?.avatarUrl,
        theme: updUser?.theme,
      },
    },
  });
};

const logoutUser: Controller = async (req, res) => {
  const _id = req.user;
  await authServices.updateUser(
    { _id },
    { accessToken: null, refreshToken: null }
  );
  res.json({ status: 204, message: 'Successfully logged out!' });
};

const getCurrentUser: Controller = async (req, res) => {
  const { email, username, avatarUrl, theme } = req.user as {
    email: string;
    username: string;
    avatarUrl: string;
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

  if (password) {
    hashPassword = await bcrypt.hash(password, 10);
  }

  if (email) {
    const userWithNewMail = await authServices.findUser({ email });
    if (userWithNewMail) {
      return HttpError(
        res,
        408,
        'Cannot change email to that which is already occupied.'
      );
    }
    const BASE_URL = env('BASE_URL');
    verificationToken = nanoid(12);
    isVerified = false;
    const data = {
      to: email,
      subject: 'Confirm your registration in Contact List app',
      text: 'Press on the link to confirm your email',
      html: `Good day! Please click on the following link to confirm your account in Task-pro app. <a href="${BASE_URL}/auth/verify/${verificationToken}" target="_blank" rel="noopener noreferrer">Confirm my mail</a>`,
    };

    await sendMail(data);
  }

  await authServices.updateUser(
    { _id },
    {
      username,
      email,
      password: hashPassword,
      theme,
      isVerified,
      verificationToken,
    }
  );

  const newUser = await authServices.findUser({ _id });

  res.json({
    status: 200,
    data: {
      username: newUser?.username,
      email: newUser?.email,
      theme: newUser?.theme,
    },
  });
};

export const verifyUser: Controller = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await authServices.findUser({
    verificationToken,
  });
  if (!user) {
    return HttpError(res, 400, 'Invalid verification token');
  }
  if (user.isVerified) {
    return HttpError(res, 400, 'Verification has already been passed');
  }
  await authServices.updateUser(
    { verificationToken },
    { verificationToken: 'User verified', isVerified: true }
  );
  res.json({
    status: 200,
    message: 'Verification successful',
  });
};
export default {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  verifyUser: ctrlWrapper(verifyUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  patchUser: ctrlWrapper(patchUser),
};
