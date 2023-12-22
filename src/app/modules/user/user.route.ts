import express from 'express';
import { userController } from './user.controller';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLES } from '../../../enum/userRoles';

const router = express.Router();

router.get(
  '/:id',
  auth(ENUM_USER_ROLES.ADMIN),
  userController.getSingleUserController,
);

router.get(
  '/',
  auth(ENUM_USER_ROLES.ADMIN),
  userController.getAllUsersController,
);

export const userRoute = router;
