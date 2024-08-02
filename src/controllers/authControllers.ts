import HttpError from '../helpers/HttpError';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { env } from '../helpers/env';
import jwt from 'jsonwebtoken';
import { Controller } from '../types';
import ctrlWrapper from '../helpers/ctrlWrapper';

const registerUser: Controller = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (user) {
    throw HttpError(409, 'Email already in use');
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid(12);
  const newUser = await authServices.registerUser({
    name,
    email,
    password: hashPassword,
    verificationToken,
  });
  const BASE_URL = env('BASE_URL');
  const data = {
    to: email,
    subject: 'Confirm your registration in Contact List app',
    text: 'Press on the link to confirm your email',
    html: `Good day! Please click on the following link to confirm your account in Contact List app. <a href="${BASE_URL}/users/verify/${verificationToken}" target="_blank" rel="noopener noreferrer">Confirm my mail</a>`,
  };
  await sendMail(data);

  res.json({
    status: 201,
    message: 'User successfully registered',
    data: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const loginUser: Controller = async (req, res, next) => {
  const JWT_SECRET = env('JWT_SECRET');
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, 'Email or password invalid');
  }

  if (!user.verify) {
    throw HttpError(
      400,
      'User mail is not verified, please check your mail for following instructions'
    );
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password invalid');
  }

  const { _id: id } = user;
  const payload = { id };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '45m' });

  const updUser = await authServices.updateUser({ _id: id }, { token });
  res.json({
    status: 200,
    data: {
      token,
      user: {
        email: updUser.email,
        subscription: updUser.subscription,
      },
    },
  });
};

const logoutUser: Controller = async (req, res, next) => {
  const id = req.user;
  const updUser = await authServices.updateUser({ _id: id }, { token: null });
  res.json({ status: 200 });
};

const getCurrentUser: Controller = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.json({
    status: 200,
    data: { email, subscription },
  });
};

const patchUser: Controller = async (req, res, next) => {
  const { id, email } = req.user;
  const { subscription } = req.body;

  if (!subscriptions.includes(subscription)) {
    throw HttpError(
      400,
      `Subscription should be one of the following : ${subscriptions.join(
        ', '
      )}`
    );
  }
  authServices.updateUser({ _id: id }, { subscription });
  res.json({
    status: 200,
    data: { email, subscription },
  });
};

export default {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  patchUser: ctrlWrapper(patchUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
};
