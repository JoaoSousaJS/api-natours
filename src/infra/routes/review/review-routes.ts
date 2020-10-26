import express from 'express'
import { protectRoutes, restrictTo, setToursIds } from '../../../main/middlewares/'
import { deleteReview, getAllReview, createReview, updateReview, getReview } from '../../../presentation/controllers/review'

export const reviewRouter = express.Router({
  mergeParams: true
})

reviewRouter.use(protectRoutes)

reviewRouter.route('/').post(restrictTo('user'), setToursIds, createReview).get(getAllReview)
reviewRouter.route('/:id').delete(restrictTo('user', 'admin'),deleteReview).patch(restrictTo('user', 'admin'),updateReview).get(getReview)
