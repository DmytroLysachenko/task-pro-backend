import { Types, Document, Schema, model } from 'mongoose';

import { ITask } from '../../types';

import taskPriorityLabels from '../../constants/taskPriorityLabels';

const taskSchema = new Schema(
  {
    columnId: {
      type: Types.ObjectId,
      required: [true, 'Column id must exists'],
    },
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
    description: {
      type: String,
      required: [true, 'Description must exists'],
    },
    priority: {
      type: String,
      enum: taskPriorityLabels,
      default: '',
    },
    deadline: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

const Task = model<ITask>('task', taskSchema);

export default Task;
