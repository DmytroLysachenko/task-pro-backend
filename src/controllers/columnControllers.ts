import { Controller } from '../types';

import ctrlWrapper from '../decorators/ctrlWrapper';
import columnServices from '../services/columnServices';
import HttpError from '../helpers/HttpError';

const createColumn: Controller = async (req, res) => {
  const userId = req.user?._id;
  const { body } = req;
  const { boardId } = req.params;

  body.userId = userId;
  body.boardId = boardId;

  const data = await columnServices.createColumn(body);

  res.status(201).json({
    status: 201,
    message: 'Column successfully created',
    data,
  });
};

const updateColumn: Controller = async (req, res, next) => {
  const body = req.body;
  const { id: _id } = req.params;

  const data = await columnServices.updateColumn({ _id }, body);

  if (!data) {
    throw new HttpError(404, `Column with id:${_id} not found`);
  }

  res.status(200).json({
    status: 200,
    message: 'Column successfully updated',
    data,
  });
};

const deleteColumn: Controller = async (req, res) => {
  const { id: _id, boardId } = req.params;

  const data = await columnServices.deleteColumn({ _id }, boardId);

  if (!data) {
    throw new HttpError(404, `Column with id:${_id} not found`);
  }

  res.status(204).json();
};

export default {
  createColumn: ctrlWrapper(createColumn),
  updateColumn: ctrlWrapper(updateColumn),
  deleteColumn: ctrlWrapper(deleteColumn),
};
