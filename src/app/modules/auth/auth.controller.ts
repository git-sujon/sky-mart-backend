import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { AuthServices } from './auth.services'
import config from '../../../config'
import {
  IUserLoginResponse,
} from '../user/user.interface'

const signupUserController = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body

  const result = await AuthServices.signupUser(userData)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully',
    data: result,
  })
})

const loginUserController = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body

  const result = await AuthServices.loginUser(loginData)

  sendResponse<IUserLoginResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: result,
  })
})


export const AuthController = {
  signupUserController,
  loginUserController,
}
