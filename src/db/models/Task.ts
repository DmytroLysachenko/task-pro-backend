import { Types, Schema, model } from 'mongoose';

import { ITask } from '../../types';

import taskPriorityLabels from '../../constants/taskPriorityLabels';
import { mongoSaveError, setMongoUpdateSettings } from './hooks';

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
      default: 'none',
    },
    deadline: {
      type: Date,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

taskSchema.post('save', mongoSaveError);

taskSchema.pre('findOneAndUpdate', setMongoUpdateSettings);

taskSchema.post('findOneAndUpdate', mongoSaveError);

const Task = model<ITask>('task', taskSchema);

export default Task;
