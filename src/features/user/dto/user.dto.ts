// Require Mongoose
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    nickname: String,
    createdAt: Date,
    updatedAt: { type: Date, default: Date.now() },
});

