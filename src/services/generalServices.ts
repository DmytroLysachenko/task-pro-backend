import Task from '../db/models/Task';
import { IFilter } from '../types';

const deleteTasks = async (filter: IFilter) => {
  return await Task.deleteMany(filter);
};

export default {
  deleteTasks,
};
