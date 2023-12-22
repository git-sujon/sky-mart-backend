import { z } from 'zod';
import { userRolesConstant } from '../user/user.constant';

const signupValidationSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'password is Required',
    }),
    role: z.enum([...userRolesConstant] as [string, ...string[]], {
      required_error: 'role is Required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'firstName is Required',
      }),
      lastName: z.string({
        required_error: 'lastName is Required',
      }),
    }),
    email: z.string({
      required_error: 'Email is Required',
    }),
    phoneNumber: z.string({
      required_error: 'Phone Number is Required',
    }),
    address: z
      .string({
        required_error: 'Address is Required',
      })
      .optional(),
  }),
});

const createLoginValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'phoneNumber is Required',
    }),
    password: z.string({
      required_error: 'password is Required',
    }),
  }),
});

export const AuthValidation = {
  signupValidationSchema,
  createLoginValidationSchema,
};
