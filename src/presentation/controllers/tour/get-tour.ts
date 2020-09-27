import { TourModel } from '../../../data/models/tour'
import { catchAsync } from '../../errors/catch-async-error'

export const getTour = catchAsync(async (req, res, next): Promise<void> => {
  const tour = await TourModel.findById(req.params.id)
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
})
