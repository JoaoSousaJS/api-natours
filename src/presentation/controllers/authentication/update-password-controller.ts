import { UserModel } from '../../../data/models/user/user'
import { AppError, catchAsync } from '../../errors'
import { sendTokenWithoutField } from '../../helper/authentication/send-token-without-field-helper'

export const updatePassword = catchAsync(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id).select('+password')
  if (!user) {
    return next(new AppError('User not logged in. Please login', 400))
  }
  const { currentPassword, newPassword, newPasswordConfirmation } = req.body

  if (!(await user.comparePassword(currentPassword, user.password))) {
    return next(new AppError('Your current password is wrong ', 401))
  }

  user.password = newPassword
  user.passwordConfirmation = newPasswordConfirmation
  await user.save()

  sendTokenWithoutField(user, 200, res)
})
