import Board from '../db/models/Board';
import { IBoard } from '../types';

export const getBoardsService = async (userId: string): Promise<IBoard[]> => {
  return await Board.find({ userId });
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
  return await Board.findByIdAndDelete(boardId);
};
