import { Controller } from '../types';

import ctrlWrapper from '../decorators/ctrlWrapper';
import taskServices from '../services/taskServices';
import HttpError from '../helpers/HttpError';

const createTask: Controller = async (req, res) => {
  const userId = req.user?._id;
  const { body } = req;
  const { boardId } = req.params;
  const { columnId } = req.params;

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
  const body = req.body;
  const { taskId: _id } = req.params;

  const data = await taskServices.updateTask({ _id }, body);

  if (!data) {
    throw new HttpError(404, `Task with id:${_id} not found`);
  }

  res.status(200).json({
    status: 200,
    message: 'Task successfully updated',
    data,
  });
};

const deleteTask: Controller = async (req, res) => {
  const { taskId: _id, columnId } = req.params;

  const data = await taskServices.deleteTask({ _id }, columnId);

  if (!data) {
    throw new HttpError(404, `Task with id:${_id} not found`);
  }

  res.status(204).json();
};

export default {
  createTask: ctrlWrapper(createTask),
  updateTask: ctrlWrapper(updateTask),
  deleteTask: ctrlWrapper(deleteTask),
};
