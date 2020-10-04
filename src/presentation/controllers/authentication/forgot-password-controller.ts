import { UserModel } from '../../../data/models/user/user'
import { sendEmail } from '../../../main/utils/email'
import { AppError, catchAsync } from '../../errors'

export const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body
  const user = await UserModel.findOne({ email })

  if (!user) {
    return next(new AppError('There is no user with this email address', 404))
  }

  const resetToken = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false })

  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/reset-password/${resetToken}`

  const message = `Forgot your password? Submit a PATCH request with your new password to ${resetURL}. If you did not forget your password, please ignore this email`

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 minutes)',
      message
    })

    res.status(200).json({
      status: 'success',
      message: 'Token send to email'
    })
  } catch (err) {
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save({ validateBeforeSave: false })

    return next(new AppError('There was an error sending the email. Try again later', 500))
  }
})
