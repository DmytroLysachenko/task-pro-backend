import User from '../db/models/User';
import { FindOneUserType, PatchUserDataType } from '../types';

export async function registerUser({
  name,
  email,
  password,
  verificationToken,
}: {
  name: string;
  email: string;
  password: string;
  verificationToken: string;
}) {
  return User.create({
    name,
    email,
    password,
    subscription: 'starter',
    verificationToken,
  });
}

export async function findUser(filter: FindOneUserType) {
  return User.findOne(filter);
}

export async function updateUser(
  filter: FindOneUserType,
  data: PatchUserDataType
) {
  return User.findOneAndUpdate(filter, data);
}
