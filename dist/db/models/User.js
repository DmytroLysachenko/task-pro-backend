import { Schema } from 'mongoose';
const userSchem = new Schema({
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
        default: '', //Link?
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
});
export default userSchem;
