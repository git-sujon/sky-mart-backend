import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { userServices } from './user.services';

const getAllUsersController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await userServices.getAllUsers();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Users data retrieved successfully',
      data: result,
    });
  },
);

const getSingleUserController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await userServices.getSingleUser(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User data retrieved successfully',
      data: result,
    });
  },
);

export const userController = {
  getAllUsersController,
  getSingleUserController,
};
