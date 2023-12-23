import mongoose, { Schema, model } from 'mongoose';
import { ICart, cartModel } from './cart.interface';

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
        color: { type: String },
        size: { type: String },
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

export const Cart = model<ICart, cartModel>('Cart', cartSchema);
