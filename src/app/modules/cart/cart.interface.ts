import mongoose, { Model } from 'mongoose';

export interface ICartItem {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  title?:string;
  color?: string;
  size?: string;
}

export type ICart = {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
};

export type cartModel = Model<ICart, Record<string, unknown>>;
