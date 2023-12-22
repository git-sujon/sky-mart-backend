import httpStatus from 'http-status';
import APIError from '../../../errors/ApiErrors';
import { IUser, IUserLoginResponse } from '../user/user.interface';
import { User } from '../user/user.model';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';

const signupUser = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: IUser): Promise<IUserLoginResponse> => {
  const { email, password } = payload;

  const isAdminExist = await User.isUserExist(email);

  if (!isAdminExist) {
    throw new APIError(httpStatus.NOT_FOUND, "User doesn't Exist");
  }

  if (!(await User.isPasswordMatch(password, isAdminExist.password))) {
    throw new APIError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }

  const { _id, role } = isAdminExist;

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
