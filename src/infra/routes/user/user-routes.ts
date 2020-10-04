import express from 'express'
import { signUp, signIn, forgotPassword, resetPassword } from '../../../presentation/controllers/authentication/index'
import { getAllUsers } from '../../../presentation/controllers/user/index'

export const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/signin', signIn)
userRouter.post('/forgot-password', forgotPassword)
userRouter.patch('/reset-password/:token', resetPassword)
userRouter.get('/', getAllUsers)
