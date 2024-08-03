import { Request, Response } from 'express';

import ctrlWrapper from '../helpers/ctrlWrapper';

const addColumn = (req: Request, res: Response) => {
  res.status(201).json({
    res: 'Add success!',
  });
};

const editColumn = (req: Request, res: Response) => {
  res.status(200).json({
    res: 'Edit success!',
  });
};

const deleteColumn = (req: Request, res: Response) => {
  res.status(204).json();
};

export default {
  addColumn,
  editColumn,
  deleteColumn,
};
