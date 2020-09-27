import { TourModel } from '../../../data/models/tour'
import { AppError } from '../../errors/app-error'
import { catchAsync } from '../../errors/catch-async-error'

export const updateTour = catchAsync(async (req,res, next): Promise<void> => {
  const tour = await TourModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404))
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
})
