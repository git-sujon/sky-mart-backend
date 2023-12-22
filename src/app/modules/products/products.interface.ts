import { Model } from 'mongoose';

export type IProduct = {
  title: string;
  image: string;
  variations: {
    color: string;
    size: string;
  }[];
};


export type productModel = Model<IProduct, Record<string, unknown>>