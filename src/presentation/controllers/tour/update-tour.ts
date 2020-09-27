import { TourModel } from '../../../data/models/tour'
import { catchAsync } from '../../errors/catch-async-error'

export const updateTour = catchAsync(async (req,res, next): Promise<void> => {
  const tour = await TourModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
})
