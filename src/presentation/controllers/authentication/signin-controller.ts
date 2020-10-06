
import { UserModel } from '../../../data/models/user/user'
import { AppError } from '../../errors/app-error'
import { catchAsync } from '../../errors/catch-async-error'
import { signInJwtHelper } from '../../helper/authentication/signin-helper'

export const signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400))
  }

  const user = await UserModel.findOne({ email }).select('+password')

  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401))
  }

  const token = signInJwtHelper(user._id)

  res.status(200).json({
    status: 'success',
    token
  })
})
