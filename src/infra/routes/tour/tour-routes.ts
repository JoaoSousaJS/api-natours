import express from 'express'
import { getAllTours, getTour, deleteTour, updateTour, createTour, getTourStats, getMonthlyPlan, getToursWithin } from '../../../presentation/controllers/tour/index'
import { aliasTopTours, protectRoutes, restrictTo } from '../../../main/middlewares/'
import { reviewRouter } from '../review/review-routes'

export const tourRouter = express.Router()

tourRouter.use('/:tourId/reviews', reviewRouter)

tourRouter.route('/top-5-cheap').get(aliasTopTours, getAllTours)
tourRouter.route('/tour-stats').get(getTourStats)
tourRouter.route('/monthly-plan/:year').get(protectRoutes, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan)

tourRouter.route('/tours-within/:distance/center/:latlng/unit/:unit').get(getToursWithin)

tourRouter.route('/:id')
  .get(getTour)
  .patch(protectRoutes, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protectRoutes, restrictTo('admin', 'lead-guide'), deleteTour)

tourRouter.route('/').get(getAllTours).post(protectRoutes, restrictTo('admin', 'lead-guide'), createTour)

// tourRouter.route('/:tourId/reviews').post(protectRoutes, restrictTo('user'), createReview)
