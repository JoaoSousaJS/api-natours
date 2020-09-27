import { TourModel } from '../../../data/models/tour'
import { catchAsync } from '../../errors/catch-async-error'

export const createTour = catchAsync(async (req,res, next): Promise<void> => {
  const newTour = await TourModel.create(req.body)

  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour
    }
  })
})
