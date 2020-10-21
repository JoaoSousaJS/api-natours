import express from 'express'
import { protectRoutes, restrictTo } from '../../../main/middlewares/'
import { deleteReview, getAllReview, createReview, updateReview } from '../../../presentation/controllers/review'

export const reviewRouter = express.Router({
  mergeParams: true
})

reviewRouter.route('/').post(protectRoutes, restrictTo('user'), createReview).get(getAllReview)
reviewRouter.route('/:id').delete(protectRoutes, deleteReview).patch(protectRoutes, updateReview)
