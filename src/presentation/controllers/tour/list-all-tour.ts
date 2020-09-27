import { TourModel } from '../../../data/models/tour'
import { APIFilter } from '../../../main/utils/api-filter'
import { catchAsync } from '../../errors/catch-async-error'

export const getAllTours = catchAsync(async (req,res, next): Promise<void> => {
  const filter = new APIFilter(TourModel.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
  const tours = await filter.query

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
})
