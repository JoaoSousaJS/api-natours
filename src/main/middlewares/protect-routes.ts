
import { AppError } from '../../presentation/errors/app-error'
import { catchAsync } from '../../presentation/errors/catch-async-error'
import { promisify } from '../../presentation/helper/index'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { UserModel } from '../../data/models/user/user'

export const protectRoutes = catchAsync(async (req, res, next) => {
  interface IDecoded {
    id?: string
    iat?: number
    exp?: number
  }

  let token
  if (req.headers.authorization) {
    if (req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
    }
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please login to get access', 401))
  }

  const decoded: IDecoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  const user = await UserModel.findById(decoded.id)
  if (!user) {
    return next(new AppError('The user belonging to this token does no longer exist', 401))
  }

  if (await user.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password. Please login again', 401))
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = user
  next()
})
