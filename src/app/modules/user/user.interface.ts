import { Model } from 'mongoose';

type IUserRoles = 'admin' | 'customer';

// Define the User type
export type IUser = {
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  email: string;
  password: string;
  role: IUserRoles;
  address?: string
};

export type UserModel = {
  isUserExist(
    email: string,
  ): (Pick<IUser, 'email' | 'password' | 'role'> & { _id: string }) | null;

  isPasswordMatch(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;

export type IUserLoginResponse = {
  accessToken: string;
};
