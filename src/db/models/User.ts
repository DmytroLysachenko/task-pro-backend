import { Schema, model } from 'mongoose';

import { IUser } from '../../types';

import { mongoSaveError, setMongoUpdateSettings } from './hooks';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username must exists'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email already exists'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'violet'],
      default: 'light',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', mongoSaveError);

userSchema.pre('findOneAndUpdate', setMongoUpdateSettings);

userSchema.post('findOneAndUpdate', mongoSaveError);

const User = model<IUser>('user', userSchema);

export default User;
