import httpStatus from 'http-status';
import APIError from '../errors/ApiErrors';
import { jwtHelpers } from '../helpers/jwtHelpers';
import config from '../config';
import { Secret } from 'jsonwebtoken';
import { User } from '../app/modules/user/user.model';

export const checkUserInfo = async (token: string) => {
  if (!token) {
    throw new APIError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
  }

  const verifyToken = jwtHelpers.verifiedToken(
    token as string,
    config.jwt.access_secret as Secret,
  );

  const { _id } = verifyToken;

  const userInfo = await User.findById(_id);

  if (!userInfo) {
    throw new APIError(httpStatus.NOT_FOUND, 'User Not Found');
  }

  return userInfo;
};
