import HttpError from '../helpers/HttpError';
import ctrlWrapper from '../decorators/ctrlWrapper';
import columnServices from '../services/columnServices';
import generalServices from '../services/generalServices';

import { Types } from 'mongoose';
import { Controller } from '../types';

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

  res.status(201).json({
    status: 201,
    message: 'Column created successfully',
    data: { _id, title, tasks, createdAt, updatedAt },
  });
};

const updateColumn: Controller = async (req, res) => {
  const body = req.body;
  const userId = req.user?._id as string;

  const { columnId, boardId } = req.params;

  const data = await columnServices.updateColumn(
    { _id: columnId, boardId, userId },
    body
  );

  if (!data) {
    throw new HttpError(400, 'Column not found');
  }

  const { title, tasks, _id, createdAt, updatedAt } = data;

  res.status(200).json({
    status: 200,
    message: 'Column updated successfully',
    data: { _id, title, tasks, createdAt, updatedAt },
  });
};

const deleteColumn: Controller = async (req, res) => {
  const { columnId, boardId } = req.params;
  const userId = req.user?._id as string;

  const objectColumnId = new Types.ObjectId(columnId);

  const newBoard = await columnServices.deleteColumnFromBoard(
    {
      _id: boardId,
      userId,
    },
    objectColumnId
  );

  if (!newBoard) {
    throw new HttpError(404, `Column with id:${columnId} not found`);
  }

  const data = await columnServices.deleteColumn({
    _id: columnId,
    boardId,
    userId,
  });

  if (!data) {
    throw new HttpError(404, `Column with id:${columnId} not found`);
  }

  await generalServices.deleteTasks({ columnId, boardId, userId });

  res.status(204).json();
};

export default {
  createColumn: ctrlWrapper(createColumn),
  updateColumn: ctrlWrapper(updateColumn),
  deleteColumn: ctrlWrapper(deleteColumn),
};
