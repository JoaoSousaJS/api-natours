import { ReviewModel } from '../../../data/models/review/review'
import { catchAsync } from '../../errors'

export const createReview = catchAsync(async (req, res, next) => {
  // allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId
  if (!req.body.user) req.body.user = req.user.id

  const { user } = req.body
  const { tour } = req.body

  const { review, rating } = req.body
  await ReviewModel.create({
    review,
    rating,
    user,
    tour
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
