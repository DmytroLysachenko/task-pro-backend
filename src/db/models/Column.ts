import { Types, Schema, model } from 'mongoose';

import { IColumn } from '../../types';

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

const Column = model<IColumn>('column', columnSchema);

export default Column;
