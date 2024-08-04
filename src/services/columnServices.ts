import { IFilter, IColumnBody } from '../types';

import Column from '../db/models/Column';
import Board from '../db/models/Board';

const createColumn = async (body: IColumnBody) => {
  const newColumn = await Column.create(body);

  const { _id } = newColumn;
  const { boardId } = body;

  await Board.findByIdAndUpdate({ _id: boardId }, { $push: { columns: _id } });

  return newColumn;
};

const updateColumn = async (filter: IFilter, body: IColumnBody) => {
  return await Column.findOneAndUpdate(filter, body);
};

const deleteColumn = async (filter: IFilter, boardId: string) => {
  const deletedColumn = await Column.findByIdAndDelete(filter);

  await Board.findByIdAndUpdate(
    { _id: boardId },
    { $pull: { columns: filter } }
  );

  return deletedColumn;
};

export default {
  createColumn,
  updateColumn,
  deleteColumn,
};
