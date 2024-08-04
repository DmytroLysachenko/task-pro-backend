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
  [500]: 'Internal server error',
};

export interface CustomErrorType extends Error {
  status: number;
}

const HttpError = (
  res: Response,
  status: number = 500,
  originalMessage: string = messageList[status]
) => {
  const message =
    originalMessage.replace(/"/g, '').charAt(0).toUpperCase() +
    originalMessage.replace(/"/g, '').slice(1);

  res.status(status).json({ message });
};

export default HttpError;
