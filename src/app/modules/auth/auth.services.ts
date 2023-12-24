import httpStatus from 'http-status';
import APIError from '../../../errors/ApiErrors';
import { IUser, IUserLoginResponse } from '../user/user.interface';
import { User } from '../user/user.model';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import {  Secret } from 'jsonwebtoken';
import config from '../../../config';

const signupUser = async (payload: IUser): Promise<IUser> => {

  const isUserExist = await User.isUserExist(payload?.email);

  if (isUserExist) {
    throw new APIError(httpStatus.NOT_FOUND, "Use different email, Email already exist!");
  }


  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: IUser): Promise<IUserLoginResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new APIError(httpStatus.NOT_FOUND, "User doesn't Exist");
  }

  if (!(await User.isPasswordMatch(password, isUserExist.password))) {
    throw new APIError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }

  const { _id, role } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { _id, role, email },
    config.jwt.access_secret as Secret,
    config.jwt.expire_access_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  signupUser,
  loginUser,
};
