import { Request, Response, NextFunction } from 'express'
import APIError from '../../errors/ApiErrors'
import httpStatus from 'http-status'
import { JwtHelpers } from '../../helpers/jwtHelpers'
import config from '../../config'
import { Secret } from 'jsonwebtoken'

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get authorize token

      const token = req.headers.authorization

      if (!token) {
        throw new APIError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
      }

      let verifiedUser = null

      verifiedUser = JwtHelpers.verifyToken(
        token,
        config.jwt.access_secret as Secret
      )

      req.user = verifiedUser

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new APIError(httpStatus.FORBIDDEN, 'Forbidden Access')
      }
      next()
    } catch (error) {
      next(error)
    }
  }

export default auth
