import { IFilter, IColumnBody } from '../types';

import Column from '../db/models/Column';

const createColumn = (body: IColumnBody) => {
  return Column.create(body);
};

const updateColumn = (filter: IFilter, body: IColumnBody) => {
  return Column.findOneAndUpdate(filter, body, { new: true });
};

const deleteColumn = (filter: IFilter) => {
  return Column.findByIdAndDelete(filter);
};

export default {
  createColumn,
  updateColumn,
  deleteColumn,
};
