import express from 'express';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLES } from '../../../enum/userRoles';
import { CartController } from './cart.controller';


const router = express.Router();

router.post('/add-to-cart', CartController.addToCart)
router.get('/get-my-cart', CartController.getMyCart)

export const ProductRoute = router;
