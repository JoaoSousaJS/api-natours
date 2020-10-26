import { AppError, catchAsync } from '../errors'

export const getOne = (Model, popOptions): any => {
  catchAsync(async (req, res, next): Promise<void> => {
    let query = Model.findById(req.params.id)
    if (popOptions) query = query.populate(popOptions)

    const doc = await query

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
