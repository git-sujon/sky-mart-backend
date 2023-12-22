import httpStatus from 'http-status';
import APIError from '../../../errors/ApiErrors';
import { ICart, ICartItem } from './cart.interface';
import { Cart } from './cart.model';
import { checkUserInfo } from '../../../utils/checkUserInfo';
import mongoose from 'mongoose';

const addToCart = async (
  token: string | undefined,
  payload: ICartItem,
): Promise<ICart> => {
  const { productId, quantity } = payload;

  const userInfo = checkUserInfo(token!);

  if (!productId || !quantity) {
    throw new APIError(
      httpStatus.NOT_FOUND,
      'Please provide valid product and quantity',
    );
  }

  let isCartExist = await Cart.findOne({ userId: (await userInfo)._id });

  if (!isCartExist) {
    isCartExist = await Cart.create({
      userId: (await userInfo)._id,
      items: [],
    });
  }

  const checkExistingProduct = isCartExist.items.findIndex(
    item => item?.productId?.equals(productId),
  );

  if (checkExistingProduct !== -1) {
    isCartExist.items[checkExistingProduct].quantity += quantity;
  } else {
    const newItem: ICartItem = { productId, quantity };
    isCartExist.items.push(newItem);
  }

  await isCartExist.save();

  return isCartExist;
};

const getMyCart = async (token: string | undefined): Promise<ICart | null> => {
  const userInfo = checkUserInfo(token!);
  const result = await Cart.findOne({ userId: (await userInfo)._id });
  return result;
};

export const CartServices = {
  addToCart,
  getMyCart,
};
