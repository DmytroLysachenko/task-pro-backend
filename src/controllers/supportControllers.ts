import ctrlWrapper from '../decorators/ctrlWrapper';
import { getMarkup } from '../constants/supportEmail';
import { sendMail } from '../helpers/sendEmail';

import { Controller } from '../types';

const createRequest: Controller = async (req, res) => {
  const { email, message } = req.body;

  const emailData = {
    to: 'sadig58183@eixdeal.com',
    subject: `Support request`,
    html: getMarkup(email, message),
  };

  sendMail(emailData);

  res.status(200).json({
    status: 200,
    message: 'Email send successfully',
  });
};

export default {
  createRequest: ctrlWrapper(createRequest),
};
