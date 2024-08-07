import Task from '../db/models/Task';
import Board from '../db/models/Board';
import Column from '../db/models/Column';

import { Types } from 'mongoose';
import { IFilter, IColumnBody } from '../types';

const createColumn = async (body: IColumnBody) => {
  const { boardId, userId } = body;

  const newColumn = await Column.create(body);
  const { _id } = newColumn;

  if (newColumn) {
    await Board.findOneAndUpdate(
      { _id: boardId, userId },
      { $push: { columns: _id } }
    );
  }

  return newColumn;
};

const checkBoard = async (filter: IFilter) => {
  return await Board.findOne(filter);
};

const updateColumn = async (filter: IFilter, body: IColumnBody) => {
  return await Column.findOneAndUpdate(filter, body).populate({
    path: 'tasks',
    select: [
      'description',
      'title',
      'priority',
      'deadline',
      'createdAt',
      'updatedAt',
    ],
    model: Task,
  });
};

const deleteColumn = async (filter: IFilter) => {
  return await Column.findOneAndDelete(filter);
};

const deleteColumnFromBoard = async (
  filter: IFilter,
  columnId: Types.ObjectId
) => {
  return await Board.findOneAndUpdate(filter, {
    $pull: { columns: columnId },
  });
};
const addColumnToBoard = async (filter: IFilter) => {
  const { _id, boardId, userId } = filter;

  const newBoard = await Board.findOneAndUpdate(
    { _id: boardId, userId },
    { $push: { columns: _id } }
  );

  return newBoard;
};

export default {
  createColumn,
  updateColumn,
  deleteColumn,
  checkBoard,
  deleteColumnFromBoard,
  addColumnToBoard,
};
