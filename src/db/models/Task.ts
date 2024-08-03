import { Types, Document, Schema, model } from 'mongoose';

import taskPriorityLabels from '../../constants/taskPriorityLabels';

interface ITask extends Document {
  taskId: Types.ObjectId;
  columnId: Types.ObjectId;
  boardId: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  description: string;
  priority: string;
  deadline: string;
}

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
