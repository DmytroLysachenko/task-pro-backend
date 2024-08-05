import { IFilter, IColumnBody } from '../types';

import Column from '../db/models/Column';
import Board from '../db/models/Board';
import Task from '../db/models/Task';
import { Types } from 'mongoose';

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
  const updatedColumn = await Column.findOneAndUpdate(filter, body);

  return updatedColumn?.populate('tasks');
};

const deleteColumn = async (filter: IFilter) => {
  const deletedColumn = await Column.findOneAndDelete(filter);

  return deletedColumn;
};

const deleteTasks = async (filter: IFilter) => {
  return await Task.deleteMany(filter);
};

const deleteColumnFromBoard = async (filter: IFilter) => {
  const { _id, boardId, userId } = filter;

  const objectColumnId = new Types.ObjectId(_id);

  const newBoard = await Board.findOneAndUpdate(
    { _id: boardId, userId },
    {
      $pull: { columns: objectColumnId },
    }
  );
  return newBoard;
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
  deleteTasks,
};
