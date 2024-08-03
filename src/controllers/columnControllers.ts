import { Request, Response } from 'express';

import ctrlWrapper from '../helpers/ctrlWrapper';
import columnServices from '../services/columnServices';

const createColumn = async (req: Request, res: Response) => {
  const body = req.body;

  const data = await columnServices.createColumn(body);

  res.status(201).json({
    status: 201,
    message: 'Column successfully created',
    data,
  });
};

const updateColumn = async (req: Request, res: Response) => {
  const body = req.body;
  const { id: _id } = req.params;
  console.log(_id);

  const data = await columnServices.updateColumn({ _id }, body);
  console.log(data);

  res.status(200).json({
    status: 200,
    message: 'Column successfully updated',
    data,
  });
};

const deleteColumn = async (req: Request, res: Response) => {
  const { id: _id } = req.params;

  await columnServices.deleteColumn({ _id });

  res.status(204).json();
};

export default {
  createColumn: ctrlWrapper(createColumn),
  updateColumn: ctrlWrapper(updateColumn),
  deleteColumn: ctrlWrapper(deleteColumn),
};
