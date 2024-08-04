import { Types, Schema, model } from 'mongoose';

import { IBoard } from '../../types';

import boardIcons from '../../constants/boardIcons';
import { mongoSaveError, setMongoUpdateSettings } from './hooks';

const boardSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: [true, 'User id must exists'],
      ref: 'user',
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

boardSchema.post('save', mongoSaveError);

boardSchema.pre('findOneAndUpdate', setMongoUpdateSettings);

boardSchema.post('findOneAndUpdate', mongoSaveError);

const Board = model<IBoard>('board', boardSchema);

export default Board;
