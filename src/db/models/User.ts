import { Document, Schema, model } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatarUrl: string;
  theme: 'light' | 'dark' | 'violet';
  isVerified: boolean;
  verificationToken: string;
  accessToken: string;
  refreshToken: string;
}

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
      default: '', // ??
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
      default: '',
    },
    accessToken: {
      type: String,
      default: '',
    },
    refreshToken: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model<IUser>('User', userSchema);

export default User;
