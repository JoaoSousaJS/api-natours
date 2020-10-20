import { ReviewModel } from '../../../data/models/review/review'
import { catchAsync } from '../../errors'

export const getAllReview = catchAsync(async (req, res, next) => {
  let filter = {}
  if (req.params.tourId) filter = { tour: req.params.tourId }

  const review = await ReviewModel.find(filter)

  res.status(200).json({
    status: 'success',
    results: review.length,
    data: {
      review
    }
  })
})
