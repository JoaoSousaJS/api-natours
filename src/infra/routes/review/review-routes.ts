import express from 'express'
import { createReview } from '../../../presentation/controllers/review/add-review-controller'
import { protectRoutes, restrictTo } from '../../../main/middlewares/'
import { getAllReview } from '../../../presentation/controllers/review/get-all-reviews-controller'

export const reviewRouter = express.Router()

reviewRouter.route('/').post(protectRoutes, restrictTo('user'), createReview).get(getAllReview)
