import { Schema, model } from 'mongoose';
import { IProduct, productModel } from './products.interface';

const productSchema = new Schema<IProduct>(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    variations: [
      {
        color: { type: String, required: true },
        size: { type: String, required: true },
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

export const Product = model<IProduct, productModel>('Product', productSchema);
