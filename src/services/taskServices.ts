import Task from '../db/models/Task';
import Column from '../db/models/Column';

import { Types } from 'mongoose';
import { IFilter, ITaskBody } from '../types';

const createTask = async (body: ITaskBody) => {
  const newTask = await Task.create(body);

  const { boardId, columnId, userId, _id } = newTask;

  if (newTask) {
    await Column.findOneAndUpdate(
      { _id: columnId, boardId, userId },
      { $push: { tasks: _id } }
    );
  }

  return newTask;
};

const updateTask = async (filter: IFilter, body: ITaskBody) => {
  return await Task.findOneAndUpdate(filter, body);
};

const deleteTask = async (filter: IFilter) => {
  return await Task.findOneAndDelete(filter);
};

const checkColumn = async (filter: IFilter) => {
  return await Column.findOne(filter);
};

const replaceTask = async (
  oldColumn: IFilter,
  newColumn: IFilter,
  taskId: Types.ObjectId
) => {
  await Column.findOneAndUpdate(oldColumn, { $pull: { tasks: taskId } });

  await Column.findOneAndUpdate(newColumn, { $push: { tasks: taskId } });
};

const deleteTaskFromColumn = async (
  filter: IFilter,
  taskId: Types.ObjectId
) => {
  return await Column.findOneAndUpdate(filter, { $pull: { tasks: taskId } });
};

export default {
  deleteTaskFromColumn,
  replaceTask,
  checkColumn,
  createTask,
  updateTask,
  deleteTask,
};
