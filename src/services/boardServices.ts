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
  boardId: string,
  updateData: Partial<IBoard>
): Promise<IBoard | null> => {
  return await Board.findByIdAndUpdate(boardId, updateData, { new: true });
};

export const deleteBoardService = async (
  boardId: string
): Promise<IBoard | null> => {
  const deletedBoard = await Board.findByIdAndDelete(boardId);
  await Column.deleteMany({ boardId });
  await Task.deleteMany({ boardId });

  return deletedBoard;
};
