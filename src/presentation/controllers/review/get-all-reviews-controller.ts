import { ReviewModel } from '../../../data/models/review/review'
import { APIFilter } from '../../../main/utils/api-filter'
import { catchAsync } from '../../errors'

export const getAllReview = catchAsync(async (req, res, next) => {
  const filter = new APIFilter(ReviewModel.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()

  const review = await filter.query

  res.status(200).json({
    status: 'success',
    results: review.length,
    data: {
      review
    }
  })
})
