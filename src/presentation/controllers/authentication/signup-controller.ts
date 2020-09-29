import { UserModel } from '../../../data/models/user/user'
import { catchAsync } from '../../errors/catch-async-error'

export const signUp = catchAsync(async (req, res, next) => {
  const newUser = await UserModel.create(req.body)

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser
    }
  })
})
