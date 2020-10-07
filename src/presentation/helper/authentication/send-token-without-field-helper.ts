import { signInJwtHelper } from './signin-helper'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const sendTokenWithoutField = (user, statusCode, res) => {
  const token = signInJwtHelper(user._id)

  res.status(statusCode).json({
    status: 'success',
    token
  })
}
