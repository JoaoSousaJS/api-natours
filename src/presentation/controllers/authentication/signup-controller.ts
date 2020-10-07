import { UserModel } from '../../../data/models/user/user'
import { catchAsync } from '../../errors/catch-async-error'
import { sendToken } from '../../helper/authentication/send-token-helper'

export const signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirmation, passwordChangedAt, role } = req.body
  await UserModel.create({
    name,
    email,
    password,
    role,
    passwordConfirmation,
    passwordChangedAt
  })

  sendToken({ name, email }, 201, res)
})
