import express from 'express'
import validationRequest from '../../middleware/validationRequest'

import { AuthValidation } from './auth.validation'
import { AuthController } from './auth.controller'

const router = express.Router()

router.post(
  '/signup',
  validationRequest(AuthValidation.signupValidationSchema),
  AuthController.signupUserController
)

router.post(
  '/login',
  validationRequest(AuthValidation.createLoginValidationSchema),
  AuthController.loginUserController
)

export const AuthRoute = router
