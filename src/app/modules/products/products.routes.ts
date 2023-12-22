import express from 'express';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLES } from '../../../enum/userRoles';
import { ProductsController } from './products.controller';

const router = express.Router();

router.get(
  '/:id',
  auth(ENUM_USER_ROLES.ADMIN),
  ProductsController.getSingleProductController,
);

router.get(
  '/',
  auth(ENUM_USER_ROLES.ADMIN),
  ProductsController.getAllProductsController,
);

export const ProductRoute = router;
