import crypto from 'crypto'
import { UserModel } from '../../../data/models/user/user'
import { AppError, catchAsync } from '../../errors'
import { sendTokenWithoutField } from '../../helper/authentication/send-token-without-field-helper'

export const resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

  const user = await UserModel
    .findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    })
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400))
  }

  user.password = req.body.password
  user.passwordConfirmation = req.body.passwordConfirmation
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  await user.save()

  sendTokenWithoutField(user, 200, res)
})
