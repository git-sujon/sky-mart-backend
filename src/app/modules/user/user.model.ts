import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { userRolesConstant } from './user.constant';
import bcrypt from 'bcrypt';
import config from '../../../config';
// Define the User schema
const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    password: { type: String, required: true, select: 0 },
    role: { type: String, enum: userRolesConstant, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    address: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.statics.isUserExist = async function (
  email: string,
): Promise<
  (Pick<IUser, 'email' | 'password' | 'role'> & { _id: string }) | null
> {
  return await User.findOne(
    { email },
    { _id: 1, email: 1, role: 1, password: 1 },
  );
};

userSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// bcrypt user password
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_saltRounds),
  );
  next();
});

// Create and export the User model
export const User = model<IUser, UserModel>('User', userSchema);
