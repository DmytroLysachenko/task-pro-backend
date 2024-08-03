import { NextFunction, Request, Response } from 'express';

interface RequestWithUser extends Request {
  user: {
    username?: string;
    email?: string;
    password?: string;
    avatarUrl?: string;
    theme?: 'light' | 'dark' | 'violet';
    isVerified?: boolean;
    verificationToken?: string;
    accessToken?: string | null;
    refreshToken?: string | null;
  };
}

export type Controller = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => Promise<void>;

export interface EmailDataType {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export interface PatchUserDataType {
  username?: string;
  email?: string;
  password?: string;
  avatarUrl?: string;
  theme?: 'light' | 'dark' | 'violet';
  isVerified?: boolean;
  verificationToken?: string;
  accessToken?: string | null;
  refreshToken?: string | null;
}

export interface FindOneUserType {
  username?: string;
  email?: string;
  password?: string;
  _id?: unknown;
  verificationToken?: string;
  accessToken?: string | null;
  refreshToken?: string | null;
}
