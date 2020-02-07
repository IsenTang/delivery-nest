import { Document } from 'mongoose';

export interface User extends Document {
    username: string,
    password: string,
    nickname: string,
    createdAt: Date,
    updatedAt: Date
}