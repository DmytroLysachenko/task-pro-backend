import { Types, Schema, model } from 'mongoose';

import { IColumn } from '../../types';

const columnSchema = new Schema(
  {
    columnId: {
      type: Types.ObjectId,
    },
    boardId: {
      type: Types.ObjectId,
      // required: [true, 'boardId must exists'],
    },
    userId: {
      type: Types.ObjectId,
      // required: [true, 'userId must exists'],
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
