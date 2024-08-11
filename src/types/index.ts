import { NextFunction, Request, Response } from 'express';
import { Document, Types } from 'mongoose';

export interface RequestWithUser extends Request {
  user?: {
    _id: unknown | string;
    username: string;
    email: string;
    avatarUrl: string | null;
    theme: 'light' | 'dark' | 'violet';
    isVerified: boolean;
  };
}

export type Controller = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => Promise<void>;

export interface IEmailData {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

// Models Types

export interface IBoard extends Document {
  userId: Types.ObjectId;
  title: string;
  icon: string;
  backgroundImg: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
    preview?: string;
  } | null;
  columns: object[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IColumn extends Document {
  boardId: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  tasks: object[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ITask extends Document {
  columnId: Types.ObjectId;
  boardId: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  description: string;
  priority: string;
  deadline: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatarUrl: string | null;
  theme: 'light' | 'dark' | 'violet';
  isVerified: boolean;
  verificationToken: string | null;
}

export interface ISession extends Document {
  userId: Types.ObjectId | unknown;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface IFilter {
  _id?: string;
  userId?: string;
  boardId?: string;
  columnId?: string;
}

export interface IUserFilter {
  _id?: unknown | string;
  username?: string;
  email?: string;
  verificationToken?: string;
  accessToken?: string | null;
  refreshToken?: string | null;
}

export interface IColumnBody extends Partial<IColumn> {}
export interface IBoardBody extends Partial<IBoard> {}
export interface ITaskBody extends Partial<ITask> {}
export interface IUserBody extends Partial<IUser> {}
export interface ISessionBody extends Partial<ISession> {}
