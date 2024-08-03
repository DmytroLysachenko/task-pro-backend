import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { env } from './env';
import { EmailDataType } from '../types/index';
dotenv.config();
const VERIFIED_MAIL = env('VERIFIED_MAIL');
const VERIFIED_MAIL_PASSWORD = env('VERIFIED_MAIL_PASSWORD');

const nodemailerConfig = {
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: VERIFIED_MAIL,
    pass: VERIFIED_MAIL_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(nodemailerConfig);

export const sendMail = (data: EmailDataType) => {
  const email = { ...data, from: VERIFIED_MAIL };
  transporter.sendMail(email);
};
