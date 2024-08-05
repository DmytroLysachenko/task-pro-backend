import { IFilter } from '../types';

import Task from '../db/models/Task';
import Column from '../db/models/Column';

const createTask = async (body: any) => {
  //find board(_id:boardId, userId)

  //find column(_id:columnId, userId, boardId)

  const newTask = await Task.create(body);

  const { _id } = newTask;
  const { columnId } = body;

  await Column.findByIdAndUpdate({ _id: columnId }, { $push: { tasks: _id } });

  return newTask;
};

const updateTask = async (filter: IFilter, body: any) => {
  return await Task.findOneAndUpdate(filter, body);
};

const deleteTask = async (filter: IFilter, columnId: string) => {
  const deletedTask = await Task.findByIdAndDelete(filter);

  await Column.findByIdAndUpdate(
    { _id: columnId },
    { $pull: { tasks: filter } }
  );

  return deletedTask;
};

export default {
  createTask,
  updateTask,
  deleteTask,
};
