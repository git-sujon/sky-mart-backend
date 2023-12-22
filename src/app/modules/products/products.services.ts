import { IProduct } from './products.interface';
import { Product } from './products.model';

const getAllProducts = async (): Promise<IProduct[]> => {
  const result = await Product.find({});
  return result;
};
const getSingleProduct = async (payload: string): Promise<IProduct | null> => {
  const result = await Product.findById(payload);
  return result;
};

export const ProductsServices = {
  getAllProducts,
  getSingleProduct,
};
