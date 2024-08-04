import multer, { FileFilterCallback } from 'multer';
import path from 'node:path';
import HttpError from '../helpers/HttpError';
import { Request } from 'express';

const destination = path.resolve('src', 'temp');

const storage = multer.diskStorage({
  destination,
  filename: (req, file, callback) => {
    const uniquePreffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePreffix}_${file.originalname}`;
    callback(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  const extension = file.originalname.split('.').pop();
  if (extension === 'exe') {
    return callback(new HttpError(400, '.exe not allow extension'));
  }
  callback(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
