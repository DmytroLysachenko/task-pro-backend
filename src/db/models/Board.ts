import { Types, Document, Schema, model } from 'mongoose';

import boardIcons from '../../constants/boardIcons';

interface IBoard extends Document {
  boardId: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  icon: string;
  backgroundImg: object;
  columns: object[]; // ?? IColumn
}

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
      type: [Schema.Types.Mixed], // ?? IColumn
      ref: 'Column',
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

const Board = model<IBoard>('Board', boardSchema);

export default Board;
