import { Controller } from '../types';

import ctrlWrapper from '../decorators/ctrlWrapper';
import columnServices from '../services/columnServices';
import HttpError from '../helpers/HttpError';

const createColumn: Controller = async (req, res) => {
  const userId = req.user?._id as string;
  const { body } = req;
  const { boardId } = req.params;

  body.userId = userId;
  body.boardId = boardId;

  const board = await columnServices.checkBoard({ _id: boardId, userId });

  if (!board) {
    throw new HttpError(404, `Board with id:${boardId} does not exist`);
  }

  const data = await columnServices.createColumn(body);

  if (!data) {
    throw new HttpError(400, `Something went wrong during column creation`);
  }

  const { title, tasks, _id, createdAt, updatedAt } = data;
  console.log(data);

  res.status(201).json({
    status: 201,
    message: 'Column successfully created',
    data: { _id, title, tasks, createdAt, updatedAt },
  });
};

const updateColumn: Controller = async (req, res, next) => {
  const body = req.body;
  const userId = req.user?._id as string;

  const { id: _id, boardId } = req.params;

  const data = await columnServices.updateColumn(
    { _id, boardId, userId },
    body
  );

  if (!data) {
    throw new HttpError(400, 'Column not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Column successfully updated',
    data,
  });
};

const deleteColumn: Controller = async (req, res) => {
  const { id: _id, boardId } = req.params;
  const userId = req.user?._id as string;

  const newBoard = await columnServices.deleteColumnFromBoard({
    _id,
    boardId,
    userId,
  });

  if (!newBoard) {
    throw new HttpError(404, `Column id:${_id} not found`);
  }

  const data = await columnServices.deleteColumn({ _id, boardId, userId });

  if (!data) {
    throw new HttpError(404, `Column with id:${_id} not found`);
  }

  await columnServices.deleteTasks({ columnId: _id, boardId, userId });

  res.status(204).json();
};

export default {
  createColumn: ctrlWrapper(createColumn),
  updateColumn: ctrlWrapper(updateColumn),
  deleteColumn: ctrlWrapper(deleteColumn),
};
