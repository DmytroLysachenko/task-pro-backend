import { Types, Schema, model } from 'mongoose';

import { IBoard } from '../../types';

import boardIcons from '../../constants/boardIcons';

const boardSchema = new Schema(
  {
    boardId: {
      type: Types.ObjectId,
    },
    userId: {
      type: Types.ObjectId,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    icon: {
      type: String,
      enum: boardIcons,
      default: 'icon_1',
    },
    backgroundImg: {
      type: Object,
      default: {},
    },
    columns: {
      type: Array,
      ref: 'column',
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

const Board = model<IBoard>('board', boardSchema);

export default Board;
