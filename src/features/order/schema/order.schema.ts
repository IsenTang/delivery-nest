// Require Mongoose
import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    payment: String,
    cart: Array,
    user: Object,
    restaurant: Object,
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
});