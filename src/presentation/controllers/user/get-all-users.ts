import { UserModel } from '../../../data/models/user/user'
import { catchAsync } from '../../errors/catch-async-error'

export const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserModel.find()

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  })
}
)
