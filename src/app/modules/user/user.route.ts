import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLES } from '../../../enum/userRoles';

const router = express.Router();

router.get(
  '/my-profile',
  auth(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.CUSTOMER),
  UserController.getMyProfile,
);


router.get(
  '/:id',
  auth(ENUM_USER_ROLES.ADMIN),
  UserController.getSingleUserController,
);

router.get(
  '/',
  auth(ENUM_USER_ROLES.ADMIN),
  UserController.getAllUsersController,
);

export const UserRoute = router;
  