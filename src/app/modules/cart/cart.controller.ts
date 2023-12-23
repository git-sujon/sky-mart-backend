import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { CartServices } from './cart.services';





const addToCart = catchAsync(async (req: Request, res: Response) => {
  const authToken = req.headers.authorization;
  const payload = req.body
  const result = await CartServices.addToCart(authToken,payload );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product added to cart',
    data: result,
  });
});



const getMyCart = catchAsync(async (req: Request, res: Response) => {
  const authToken = req.headers.authorization;

  const result = await CartServices.getMyCart(authToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product data retrieved successfully',
    data: result,
  });
});

export const CartController = {
  getMyCart,
  addToCart
};
