import { IFilter } from './../types/index';
import Board from '../db/models/Board';
import Column from '../db/models/Column';
import Task from '../db/models/Task';

import { IBoard } from '../types';

export const getBoardsService = async (userId: string): Promise<IBoard[]> => {
  return await Board.find({ userId }).populate({
    path: 'columns',
    select: ['title', 'createdAt', 'updatedAt'],
    populate: {
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
    },
  });
};

export const createBoardService = async (
  boardData: IBoard
): Promise<IBoard> => {
  const board = new Board(boardData);
  return await board.save();
};

export const updateBoardService = async (
  filter: IFilter,
  updateData: Partial<IBoard>
): Promise<IBoard | null> => {
  return await Board.findOneAndUpdate(filter, updateData).populate({
    path: 'columns',
    select: ['title', 'createdAt', 'updatedAt'],
    populate: {
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
    },
  });
};

export const deleteBoardService = async (
  filter: IFilter
): Promise<IBoard | null> => {
  const { boardId: _id, userId } = filter;

  const deletedBoard = await Board.findOneAndDelete({ _id, userId });

  await Column.deleteMany(filter);

  await Task.deleteMany(filter);

  return deletedBoard;
};
