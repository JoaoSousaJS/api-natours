import express from 'express'
import { protectRoutes, getMe, restrictTo } from '../../../main/middlewares'
import { signUp, signIn, forgotPassword, resetPassword, updatePassword } from '../../../presentation/controllers/authentication/index'
import { deleteMe, deleteUser, getAllUsers, getUser, updateMe, updateUser } from '../../../presentation/controllers/user/index'

export const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/signin', signIn)
userRouter.post('/forgot-password', forgotPassword)
userRouter.patch('/reset-password/:token', resetPassword)

userRouter.use(protectRoutes)

userRouter.route('/update-password').patch(updatePassword)
userRouter.get('/me', getMe, getUser)
userRouter.patch('/update-me', updateMe)
userRouter.delete('/delete-me',deleteMe)

userRouter.use(restrictTo('admin'))

userRouter.route('/:id').delete(deleteUser).patch(updateUser).get(getUser)
userRouter.get('/', getAllUsers)
