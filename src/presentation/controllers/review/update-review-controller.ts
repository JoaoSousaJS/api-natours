import { ReviewModel } from '../../../data/models/review/review'
import { updateOne } from '../../factory'

export const updateReview = updateOne(ReviewModel)
