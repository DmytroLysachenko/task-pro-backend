import { Types, Schema, model } from 'mongoose';
import { IBoard } from '../../types';
import boardIcons from '../../constants/boardIcons';
import { mongoSaveError, setMongoUpdateSettings } from './hooks';

const backgroundImgSchema = new Schema(
  {
    mobile: String,
    tablet: String,
    desktop: String,
    preview: String,
  },
  { _id: false }
);

const boardSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: [true, 'User id must exist'],
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
      type: backgroundImgSchema,
      default: null,
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
