import { Response } from 'express';

import ctrlWrapper from '../decorators/ctrlWrapper';
import {
  getBoardsService,
  createBoardService,
  updateBoardService,
  deleteBoardService,
  getBoardService,
} from '../services/boardServices';
import HttpError from '../helpers/HttpError';

import { Controller, IBoard, RequestWithUser } from '../types/index';
import { backgroundPreviews } from '../constants/boardBgImgs';

const getBoards: Controller = async (req: RequestWithUser, res: Response) => {
  const userId = req.user?._id as string;

  const boards = await getBoardsService(userId);

  const data = boards.map((board) => {
    const { _id, title, icon, createdAt, updatedAt, backgroundImg } = board;

    const previewEntry = Object.entries(backgroundPreviews).find((entry) => {
      return entry[1] === backgroundImg?.preview;
    });

    const preview = previewEntry ? previewEntry[0] : 'none';

    return {
      _id,
      title,
      icon,
      preview,
      createdAt,
      updatedAt,
    };
  });

  res.status(200).json({
    status: 200,
    data,
  });
};

const getBoard: Controller = async (req: RequestWithUser, res: Response) => {
  const userId = req.user?._id as string;
  const boardId = req.params.boardId;

  const board = (await getBoardService(userId, boardId)) as unknown;

  const { _id, title, icon, backgroundImg, columns, createdAt, updatedAt } =
    board as IBoard;

  res.status(200).json({
    status: 200,
    data: { _id, title, icon, backgroundImg, columns, createdAt, updatedAt },
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

  if (!deletedBoard) {
    throw new HttpError(404, 'Board not found');
  }

  res.status(204).send();
};

export default {
  getBoards: ctrlWrapper(getBoards),
  getBoard: ctrlWrapper(getBoard),
  createBoard: ctrlWrapper(createBoard),
  updateBoard: ctrlWrapper(updateBoard),
  deleteBoard: ctrlWrapper(deleteBoard),
};
