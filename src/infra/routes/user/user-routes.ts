import express from 'express'
import { signUp } from '../../../presentation/controllers/authentication/index'

export const userRouter = express.Router()

userRouter.post('/signup', signUp)
