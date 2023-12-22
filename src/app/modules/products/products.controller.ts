import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ProductsServices } from './products.services';

const getAllProductsController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProductsServices.getAllProducts();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Products data retrieved successfully',
      data: result,
    });
  },
);

const getSingleProductController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await ProductsServices.getSingleProduct(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Product data retrieved successfully',
      data: result,
    });
  },
);

export const ProductsController = {
  getAllProductsController,
  getSingleProductController,
};
