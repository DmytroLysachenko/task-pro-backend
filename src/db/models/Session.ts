import { Schema, model } from 'mongoose';
import { mongoSaveError, setMongoUpdateSettings } from './hooks';
import { ISession } from '../../types';

const sessionSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, 'User ID must exists'],
      unique: [true, 'User already online'],
    },
    accessToken: {
      type: String,
      required: [true, 'Access Token required'],
    },
    refreshToken: {
      type: String,
      required: [true, 'Access Token required'],
    },
  },
  { versionKey: false, timestamps: true }
);

sessionSchema.post('save', mongoSaveError);

sessionSchema.pre('findOneAndUpdate', setMongoUpdateSettings);

sessionSchema.post('findOneAndUpdate', mongoSaveError);

const Session = model<ISession>('session', sessionSchema);

export default Session;
