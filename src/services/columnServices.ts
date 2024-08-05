import { IFilter, IColumnBody } from '../types';

import Column from '../db/models/Column';
import Board from '../db/models/Board';
import Task from '../db/models/Task';
import HttpError from '../helpers/HttpError';

const createColumn = async (body: IColumnBody) => {
  const { boardId } = body;

  const board = await Board.findOne({ _id: boardId });

  if (!board) {
    throw new HttpError(400, `Board with id:${boardId} does not exist`);
  }

  const newColumn = await Column.create(body);

  const { _id } = newColumn;

  await Board.findByIdAndUpdate({ _id: boardId }, { $push: { columns: _id } });

  return newColumn;
};

const updateColumn = async (filter: IFilter, body: IColumnBody) => {
  return await Column.findOneAndUpdate(filter, body);
};

const deleteColumn = async (filter: IFilter, boardId: string) => {
  const newBoard = await Board.findByIdAndUpdate(boardId, {
    $pull: { columns: filter?._id },
  });

  if (!newBoard) {
    throw new HttpError(400, 'Board not found by id');
  }
  ///{_id, boardId, userId}
  const deletedColumn = await Column.findByIdAndDelete(filter);

  if (!deletedColumn) {
    throw new HttpError(400, 'Column not found by id');
  }

  await Task.deleteMany({ columnId: deletedColumn?._id });

  return deletedColumn;
};

export default {
  createColumn,
  updateColumn,
  deleteColumn,
};
