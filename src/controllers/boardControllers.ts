import { Response } from 'express';

import ctrlWrapper from '../decorators/ctrlWrapper';
import {
  getBoardsService,
  createBoardService,
  updateBoardService,
  deleteBoardService,
} from '../services/boardServices';
import HttpError from '../helpers/HttpError';

import { Controller, RequestWithUser } from '../types/index';

const getBoards: Controller = async (req: RequestWithUser, res: Response) => {
  const userId = req.user?._id as string;

  const boards = await getBoardsService(userId);

  const data = boards.map((board) => {
    const { _id, title, icon, backgroundImg, columns, createdAt, updatedAt } =
      board;
    return { _id, title, icon, backgroundImg, columns, createdAt, updatedAt };
  });

  res.status(200).json({
    status: 200,
    data,
  });
};

const createBoard: Controller = async (req: RequestWithUser, res: Response) => {
  const userId = req.user?._id as string;

  const boardData = { ...req.body, userId };

  const newBoard = await createBoardService(boardData);

  if (!newBoard) {
    throw new HttpError(400, 'Something went wrong during board creation');
  }

  const { _id, title, icon, backgroundImg, columns, createdAt, updatedAt } =
    newBoard;

  res.status(201).json({
    status: 201,
    message: 'Board successfully created',
    data: { _id, title, icon, backgroundImg, columns, createdAt, updatedAt },
  });
};

const updateBoard: Controller = async (req: RequestWithUser, res: Response) => {
  const userId = req.user?._id as string;
  const boardId = req.params.boardId;
  const updateData = req.body;
  const updatedBoard = await updateBoardService(
    { _id: boardId, userId },
    updateData
  );
  if (!updatedBoard) {
    throw new HttpError(404, 'Board not found');
  }
  const { _id, title, icon, backgroundImg, columns, createdAt, updatedAt } =
    updatedBoard;

  res.status(200).json({
    status: 200,
    message: 'Board successfully updated',
    data: { _id, title, icon, backgroundImg, columns, createdAt, updatedAt },
  });
};

const deleteBoard: Controller = async (req: RequestWithUser, res: Response) => {
  const userId = req.user?._id as string;

  const boardId = req.params.boardId;

  const deletedBoard = await deleteBoardService({ boardId, userId });

  console.log(deletedBoard);

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
