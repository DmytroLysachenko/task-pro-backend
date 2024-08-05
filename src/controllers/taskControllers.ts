import mongoose from 'mongoose';

import { Controller } from '../types';

import Board from '../db/models/Board';
import Column from '../db/models/Column';
import HttpError from '../helpers/HttpError';
import ctrlWrapper from '../decorators/ctrlWrapper';
import taskServices from '../services/taskServices';

const createTask: Controller = async (req, res) => {
  const userId = req.user?._id;
  const { body } = req;
  const { boardId, columnId } = req.params;

  const board = await Board.findOne({ _id: boardId });
  if (!board) {
    throw new HttpError(404, `Board with id:${boardId} not found`);
  }
  if (userId?.toString() !== board.userId.toString()) {
    throw new HttpError(
      401,
      `Board id:${boardId} does not belong to this user`
    );
  }

  const column = await Column.findOne({ _id: columnId });
  if (!column) {
    throw new HttpError(404, `Column with id:${columnId} not found`);
  }
  if (userId?.toString() !== column.userId.toString()) {
    throw new HttpError(
      401,
      `Column id:${columnId} does not belong to this user`
    );
  }

  body.userId = userId;
  body.boardId = boardId;
  body.columnId = columnId;

  const data = await taskServices.createTask(body);

  res.status(201).json({
    status: 201,
    message: 'Task successfully created',
    data,
  });
};

const updateTask: Controller = async (req, res) => {
  const userId = req.user?._id;
  const { body } = req;
  const { taskId, boardId, columnId } = req.params;
  const { columnId: newColumnId } = req.body;

  const board = await Board.findOne({ _id: boardId });
  if (!board) {
    throw new HttpError(404, `Board with id:${boardId} not found`);
  }
  if (userId?.toString() !== board.userId.toString()) {
    throw new HttpError(
      401,
      `Board id:${boardId} does not belong to this user`
    );
  }

  const column = await Column.findOne({ _id: columnId });
  if (!column) {
    throw new HttpError(404, `Column with id:${columnId} not found`);
  }
  if (userId?.toString() !== column.userId.toString()) {
    throw new HttpError(
      401,
      `Column id:${columnId} does not belong to this user`
    );
  }

  const data = await taskServices.updateTask({ _id: taskId }, body);
  if (!data) {
    throw new HttpError(404, `Task with id:${taskId} not found`);
  }

  //console.log(newColumnId, columnId);

  await Column.findOneAndUpdate(
    { _id: newColumnId },
    { $push: { tasks: taskId } }
  );

  await Column.findOneAndUpdate(
    { _id: columnId },
    { $pull: { tasks: taskId } }
  );

  res.status(200).json({
    status: 200,
    message: 'Task successfully updated',
    data,
  });
};

const deleteTask: Controller = async (req, res) => {
  const userId = req.user?._id;
  const { taskId, columnId, boardId } = req.params;

  const board = await Board.findOne({ _id: boardId });
  if (!board) {
    throw new HttpError(404, `Board with id:${boardId} not found`);
  }
  if (userId?.toString() !== board.userId.toString()) {
    throw new HttpError(
      401,
      `Board id:${boardId} does not belong to this user`
    );
  }

  const column = await Column.findOne({ _id: columnId });
  if (!column) {
    throw new HttpError(404, `Column with id:${columnId} not found`);
  }
  if (userId?.toString() !== column.userId.toString()) {
    throw new HttpError(
      401,
      `Column id:${columnId} does not belong to this user`
    );
  }

  const data = await taskServices.deleteTask({ _id: taskId }, columnId);
  if (!data) {
    throw new HttpError(404, `Task with id:${taskId} not found`);
  }

  res.status(204).json();
};

export default {
  createTask: ctrlWrapper(createTask),
  updateTask: ctrlWrapper(updateTask),
  deleteTask: ctrlWrapper(deleteTask),
};
