import { Types, Document, Schema, model } from 'mongoose';

import { ITask } from '../../types';

import taskPriorityLabels from '../../constants/taskPriorityLabels';

const taskSchema = new Schema(
  {
    taskId: {
      type: Types.ObjectId,
    },
    columnId: {
      type: Types.ObjectId,
    },
    boardId: {
      type: Types.ObjectId,
    },
    userId: {
      type: Types.ObjectId,
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
