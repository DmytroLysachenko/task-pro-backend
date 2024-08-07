import User from '../db/models/User';
import { IUserBody, IUserFilter } from '../types';

export async function registerUser({
  username,
  email,
  password,
  verificationToken,
}: IUserBody) {
  return User.create({
    username,
    email,
    password,
    verificationToken,
  });
}

export async function findUser(filter: IUserFilter) {
  return User.findOne(filter);
}

export async function updateUser(filter: IUserFilter, data: IUserBody) {
  return User.findOneAndUpdate(filter, data);
}
