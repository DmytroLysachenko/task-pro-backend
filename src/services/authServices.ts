import User from '../db/models/User';
import { FindOneUserType, PatchUserDataType } from '../types';

interface RegisterPropsType {
  name: string;
  email: string;
  password: string;
  verificationToken: string;
}

export async function registerUser({
  name,
  email,
  password,
  verificationToken,
}: RegisterPropsType) {
  return User.create({
    name,
    email,
    password,
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
