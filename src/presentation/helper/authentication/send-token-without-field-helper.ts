import 'dotenv/config'
import { CookieOption } from './cookie-option-interface'
import { signInJwtHelper } from './signin-helper'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const sendTokenWithoutField = (user, statusCode, res) => {
  const token = signInJwtHelper(user._id)
  const cookieOptions: CookieOption = {
    expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 1000),
    httpOnly: true
  }

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

  res.cookie('jwt', token, cookieOptions)

  res.status(statusCode).json({
    status: 'success',
    token
  })
}
