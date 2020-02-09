// Require Mongoose
import * as mongoose from 'mongoose';

export const MenuSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.Mixed,
    hours: mongoose.Schema.Types.Mixed
});

