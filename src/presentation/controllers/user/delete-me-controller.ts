import { UserModel } from '../../../data/models/user/user'
import { catchAsync } from '../../errors'

export const deleteMe = catchAsync(async (req, res, next) => {
  await UserModel.findByIdAndUpdate(req.user.id, { active: false })

  res.status(204).json({
    status: 'success',
    data: null
  })
})
