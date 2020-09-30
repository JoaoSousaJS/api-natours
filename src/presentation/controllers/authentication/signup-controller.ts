import { UserModel } from '../../../data/models/user/user'
import { catchAsync } from '../../errors/catch-async-error'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirmation } = req.body
  const newUser = await UserModel.create({
    name,
    email,
    password,
    passwordConfirmation
  })

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  })
})
