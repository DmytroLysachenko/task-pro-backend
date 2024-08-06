import ctrlWrapper from '../decorators/ctrlWrapper';
import { Controller } from '../types';
import { sendMail } from '../helpers/sendEmail';
import { createTicketManager } from '../helpers/createTicketManager';

const ticketManager = createTicketManager();

const createRequest: Controller = async (req, res) => {
  const { email, message } = req.body;

  const ticket = ticketManager.increaseTicket();

  const emailData = {
    to: 'sadig58183@eixdeal.com',
    subject: `Support ticket #${ticket}`,
    text: message,
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
