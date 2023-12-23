import { checkUserInfo } from '../../../utils/checkUserInfo';
import { IUser } from './user.interface';
import { User } from './user.model';

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find({});
  return result;
};
const getSingleUser = async (payload: string): Promise<IUser | null> => {
  const result = await User.findById(payload);
  return result;
};

const getMyProfile = async (
  token: string | undefined,
): Promise<IUser | null> => {
  const result = checkUserInfo(token!);

  return result;
};

export const UserServices = {
  getAllUsers,
  getSingleUser,
  getMyProfile,
};
