import HttpError from '../helpers/HttpError';
import ctrlWrapper from '../decorators/ctrlWrapper';
import taskServices from '../services/taskServices';

import { Types } from 'mongoose';
import { Controller } from '../types';

const createTask: Controller = async (req, res) => {
  const userId = req.user?._id as string;
  const { body } = req;
  const { boardId, columnId } = req.params;

  const column = await taskServices.checkColumn({
    _id: columnId,
    boardId,
    userId,
  });

  if (!column) {
    throw new HttpError(404, `Column with id:${columnId} not found`);
  }

  body.userId = userId;
  body.boardId = boardId;
  body.columnId = columnId;

  const data = await taskServices.createTask(body);

  const { _id, title, description, priority, deadline, createdAt, updatedAt } =
    data;

  res.status(201).json({
    status: 201,
    message: 'Task created successfully',
    data: { _id, title, description, priority, deadline, createdAt, updatedAt },
  });
};

const updateTask: Controller = async (req, res) => {
  const userId = req.user?._id as string;
  const { body } = req;
  const { taskId, boardId, columnId } = req.params;
  const { columnId: newColumnId } = req.body;

  const column = await taskServices.checkColumn({
    _id: columnId,
    boardId,
    userId,
  });

  if (!column) {
    throw new HttpError(404, `Column with id:${columnId} not found`);
  }

  if (newColumnId) {
    const column = await taskServices.checkColumn({
      _id: newColumnId,
      boardId,
      userId,
    });
    if (!column) {
      throw new HttpError(404, `Column with id:${newColumnId} not found`);
    }
  }

  const data = await taskServices.updateTask(
    { _id: taskId, columnId, boardId, userId },
    body
  );

  if (!data) {
    throw new HttpError(404, `Task with id:${taskId} not found`);
  }

  if (newColumnId) {
    const taskObjectId = new Types.ObjectId(taskId);

    await taskServices.replaceTask(
      { _id: columnId, boardId, userId },
      { _id: newColumnId, boardId, userId },
      taskObjectId
    );
  }

  const { _id, title, description, priority, deadline, createdAt, updatedAt } =
    data;

  res.status(200).json({
    status: 200,
    message: 'Task updated successfully',
    data: { _id, title, description, priority, deadline, createdAt, updatedAt },
  });
};

const deleteTask: Controller = async (req, res) => {
  const userId = req.user?._id as string;
  const { taskId, columnId, boardId } = req.params;

  const objectTaskId = new Types.ObjectId(taskId);

  taskServices.deleteTaskFromColumn(
    { _id: columnId, boardId, userId },
    objectTaskId
  );

  const data = await taskServices.deleteTask({
    _id: taskId,
    columnId,
    boardId,
    userId,
  });

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
