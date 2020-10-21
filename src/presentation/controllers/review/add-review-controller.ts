import { ReviewModel } from '../../../data/models/review/review'
import { createOne } from '../../factory/create-one-factory'

export const createReview = createOne(ReviewModel)
