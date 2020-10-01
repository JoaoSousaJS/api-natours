import express from 'express'
import { signUp, signIn } from '../../../presentation/controllers/authentication/index'
import { getAllUsers } from '../../../presentation/controllers/user/index'

export const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/signin', signIn)
userRouter.get('/', getAllUsers)
