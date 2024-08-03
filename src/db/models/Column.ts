import { Types, Document, Schema, model } from 'mongoose';

interface IColumn extends Document {
  columnId: Types.ObjectId;
  boardId: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  tasks: object[]; // => ITask
}

const columnSchema = new Schema(
  {
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
