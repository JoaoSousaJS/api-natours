import { TourModel } from '../../../data/models/tour/tour'
import { AppError } from '../../errors/app-error'
import { catchAsync } from '../../errors/catch-async-error'

export const getTour = catchAsync(async (req, res, next): Promise<void> => {
  const tour = await TourModel.findById(req.params.id)

  console.log(tour)

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
