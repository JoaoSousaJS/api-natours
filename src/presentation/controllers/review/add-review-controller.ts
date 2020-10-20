import { ReviewModel } from '../../../data/models/review/review'
import { catchAsync } from '../../errors'

export const createReview = catchAsync(async (req, res, next) => {
  const { review, rating, tour, user } = req.body
  await ReviewModel.create({
    review,
    rating,
    tour,
    user
  })

  res.status(201).json({
    status: 'success',
    data: {
      review: {
        review,
        rating,
        tour,
        user
      }
    }
  })
})
