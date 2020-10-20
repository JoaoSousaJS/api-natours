
import { AppError, catchAsync } from '../errors'

export const deleteOne = (Model): any => {
  return catchAsync(async (req,res, next): Promise<void> => {
    const doc = await Model.findByIdAndDelete(req.params.id)

    if (!doc) {
      return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
      data: null
    })
  })
}
