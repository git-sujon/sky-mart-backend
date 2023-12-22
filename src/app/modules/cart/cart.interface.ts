import mongoose, { Model } from 'mongoose';

interface ICartItem {
  productId: string;
  quantity: number;
}

export type ICart = {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
};

export type cartModel = Model<ICart, Record<string, unknown>>;
