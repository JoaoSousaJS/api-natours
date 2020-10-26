import express from 'express'
import { protectRoutes, getMe } from '../../../main/middlewares'
import { signUp, signIn, forgotPassword, resetPassword, updatePassword } from '../../../presentation/controllers/authentication/index'
import { deleteMe, deleteUser, getAllUsers, getUser, updateMe, updateUser } from '../../../presentation/controllers/user/index'

export const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/signin', signIn)
userRouter.post('/forgot-password', forgotPassword)
userRouter.patch('/reset-password/:token', resetPassword)
userRouter.route('/update-password').patch(protectRoutes, updatePassword)
userRouter.get('/', getAllUsers)
userRouter.get('/me', protectRoutes, getMe, getUser)
userRouter.patch('/update-me',protectRoutes, updateMe)
userRouter.delete('/delete-me',protectRoutes, deleteMe)
userRouter.route('/:id').delete(deleteUser).patch(updateUser).get(getUser)
