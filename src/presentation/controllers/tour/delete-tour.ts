import { TourModel } from '../../../data/models/tour'
import { catchAsync } from '../../errors/catch-async-error'

export const deleteTour = catchAsync(async (req,res, next): Promise<void> => {
  await TourModel.findByIdAndDelete(req.params.id)

  res.status(200).json({
    status: 'success',
    message: 'Tour deleted sucessfully'
  })
})
