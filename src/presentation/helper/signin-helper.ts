import jwt from 'jsonwebtoken'

export const signInJwtHelper = (id: string): string => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })

  return token
}
