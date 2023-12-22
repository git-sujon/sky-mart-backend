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

export const UserServices = {
  getAllUsers,
  getSingleUser,
};
