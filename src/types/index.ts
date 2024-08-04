import { NextFunction, Request, Response } from 'express';
import { Document, Types } from 'mongoose';

export interface RequestWithUser extends Request {
  user?: {
    _id: unknown | string;
    username: string;
    email: string;
    avatarUrl: string;
    theme: 'light' | 'dark' | 'violet';
    isVerified: boolean;
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

export interface RegisterPropsType {
  username: string;
  email: string;
  password: string;
  verificationToken: string;
}

// Models Types

export interface IBoard extends Document {
  boardId: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  icon: string;
  backgroundImg: object;
  columns: object[];
}

export interface IColumn extends Document {
  columnId: Types.ObjectId;
  boardId: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  tasks: object[];
}

export interface ITask extends Document {
  taskId: Types.ObjectId;
  columnId: Types.ObjectId;
  boardId: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  description: string;
  priority: string;
  deadline: string;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatarUrl: string;
  theme: 'light' | 'dark' | 'violet';
  isVerified: boolean;
  verificationToken: string;
  accessToken: string;
  refreshToken: string;
}

export interface IFilter {
  _id: string;
}

export interface IColumnBody extends Partial<IColumn> {}
export interface IBoardBody extends Partial<IBoard> {}
