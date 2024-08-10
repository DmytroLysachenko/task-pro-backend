import Session from '../db/models/Session';
import User from '../db/models/User';

import { ISessionBody, IUserBody, IUserFilter } from '../types';

export async function registerUser({
  username,
  email,
  password,
  verificationToken,
  isVerified = false,
  avatarUrl = null,
}: IUserBody) {
  return User.create({
    username,
    email,
    password,
    verificationToken,
    isVerified,
    avatarUrl,
  });
}

export async function findUser(filter: IUserFilter) {
  return User.findOne(filter);
}

export async function updateUser(filter: IUserFilter, data: IUserBody) {
  return User.findOneAndUpdate(filter, data);
}
export async function createSession({
  userId,
  accessToken,
  refreshToken,
}: ISessionBody) {
  return Session.create({ userId, accessToken, refreshToken });
}
export async function abortUserSession({ userId }: ISessionBody) {
  return Session.findOneAndDelete({ userId });
}
export async function abortSession({ userId, _id }: ISessionBody) {
  return Session.findOneAndDelete({ userId, _id });
}
export async function findSession({ userId }: ISessionBody) {
  return Session.findOne({ userId });
}
