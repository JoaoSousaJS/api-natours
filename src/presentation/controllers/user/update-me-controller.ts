import { UserModel } from '../../../data/models/user/user'
import { AppError, catchAsync } from '../../errors'
import { filterObj } from '../../helper/user/filter-object-helper'

export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates, please use /update-password', 400))
  }

  const filtedBody = filterObj(req.body, 'name', 'email')
  const updatedUser = await UserModel.findByIdAndUpdate(req.user.id, filtedBody, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  })
})
