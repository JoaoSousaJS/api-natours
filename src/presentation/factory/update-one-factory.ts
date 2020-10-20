import { AppError, catchAsync } from '../errors'

export const updateOne = (Model): any => {
  catchAsync(async (req,res, next): Promise<void> => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    if (!doc) {
      return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    })
  })
}
