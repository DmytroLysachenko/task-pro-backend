import { Response } from 'express';
import HttpError from '../helpers/HttpError';
import ctrlWrapper from '../decoratores/ctrlWrapper';
import { Controller, RequestWithUser } from '../types/index';
import {
  getBoardsService,
  createBoardService,
  updateBoardService,
  deleteBoardService,
} from '../services/boardServices';

const getBoards: Controller = async (req: RequestWithUser, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new HttpError(401, 'Unauthorized');
  }
  const boards = await getBoardsService(userId.toString());
  res.status(200).json(boards);
};

const createBoard: Controller = async (req: RequestWithUser, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new HttpError(401, 'Unauthorized');
  }
  const boardData = { ...req.body, userId: userId.toString() };
  const newBoard = await createBoardService(boardData);
  res.status(201).json(newBoard);
};

const updateBoard: Controller = async (req: RequestWithUser, res: Response) => {
  const boardId = req.params.boardid;
  const updateData = req.body;
  const updatedBoard = await updateBoardService(boardId, updateData);
  if (!updatedBoard) {
    throw new HttpError(404, 'Board not found');
  }
  res.status(200).json(updatedBoard);
};

const deleteBoard: Controller = async (req: RequestWithUser, res: Response) => {
  const boardId = req.params.boardid;
  const deletedBoard = await deleteBoardService(boardId);
  if (!deletedBoard) {
    throw new HttpError(404, 'Board not found');
  }
  res.status(204).send();
};

export default {
  getBoards: ctrlWrapper(getBoards),
  createBoard: ctrlWrapper(createBoard),
  updateBoard: ctrlWrapper(updateBoard),
  deleteBoard: ctrlWrapper(deleteBoard),
};
