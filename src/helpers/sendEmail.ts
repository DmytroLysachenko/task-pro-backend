import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { env } from './env';
import { IEmailData } from '../types/index';

dotenv.config();
const UKR_NET_EMAIL = env('UKR_NET_EMAIL');
const UKR_NET_PASSWORD = env('UKR_NET_PASSWORD');

const nodemailerConfig = {
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(nodemailerConfig);

export const sendMail = (data: IEmailData) => {
  const email = { ...data, from: UKR_NET_EMAIL };
  transporter.sendMail(email);
};
