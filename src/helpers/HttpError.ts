import { Response } from 'express';

interface messageList {
  [n: number]: string;
}

const messageList: messageList = {
  [400]: 'Bad Request',
  [401]: 'Unauthorized',
  [403]: 'Forbidden',
  [404]: 'Not Found',
  [409]: 'Conflict',
};

export interface CustomErrorType extends Error {
  status: number;
}

const HttpError = (
  res: Response,
  status: number,
  message: string = messageList[status]
) => {
  res.status(status).json({ message });
};

export default HttpError;
