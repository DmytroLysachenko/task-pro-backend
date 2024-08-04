import { Types, Schema, model } from 'mongoose';

import { IColumn } from '../../types';

import { mongoSaveError, setMongoUpdateSettings } from './hooks';

const columnSchema = new Schema(
  {
    boardId: {
      type: Types.ObjectId,
      required: [true, 'Board id must exists'],
    },
    userId: {
      type: Types.ObjectId,
      required: [true, 'User id must exists'],
    },
    title: {
      type: String,
      required: [true, 'Title must exists'],
    },
    tasks: {
      type: Array,
      ref: 'Task',
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

columnSchema.post('save', mongoSaveError);

columnSchema.pre('findOneAndUpdate', setMongoUpdateSettings);

columnSchema.post('findOneAndUpdate', mongoSaveError);

const Column = model<IColumn>('column', columnSchema);

export default Column;
