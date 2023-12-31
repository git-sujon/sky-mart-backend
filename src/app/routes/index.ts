import express, { Router } from 'express';
import { AuthRoute } from '../modules/auth/auth.route';
import { UserRoute } from '../modules/user/user.route';
import { ProductRoute } from '../modules/products/products.routes';
import { CartRoute } from '../modules/cart/cart.routes';

const router = express.Router();

type IModuleRoutes = {
  path: string;
  route: Router;
};

const moduleRoutes: IModuleRoutes[] = [
  {
    path: '/auth',
    route: AuthRoute,
  },

  {
    path: '/users',
    route: UserRoute,
  },

  {
    path: '/products',
    route: ProductRoute,
  },
  {
    path: '/carts',
    route: CartRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
