import { Controller } from '../types';

import ctrlWrapper from '../decoratores/ctrlWrapper';
import columnServices from '../services/columnServices';

const createColumn: Controller = async (req, res) => {
  const userId = req.user?._id;

  const { boardId } = req.params;

  const { body } = req;

  body.userId = userId;
  body.boardId = boardId;

  console.log(body);

  const data = await columnServices.createColumn(body);

  res.status(201).json({
    status: 201,
    message: 'Column successfully created',
    data,
  });
};

const updateColumn: Controller = async (req, res) => {
  const body = req.body;
  const { id: _id } = req.params;

  const data = await columnServices.updateColumn({ _id }, body);

  res.status(200).json({
    status: 200,
    message: 'Column successfully updated',
    data,
  });
};

const deleteColumn: Controller = async (req, res) => {
  const { id: _id, boardId } = req.params;

  await columnServices.deleteColumn({ _id }, boardId);

  res.status(204).json();
};

export default {
  createColumn: ctrlWrapper(createColumn),
  updateColumn: ctrlWrapper(updateColumn),
  deleteColumn: ctrlWrapper(deleteColumn),
};
