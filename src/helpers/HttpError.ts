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

const HttpError = (status: number, message: string = messageList[status]) => {
  const error = new Error(message);
  return error;
};

export default HttpError;
