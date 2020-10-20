import { ReviewModel } from '../../../data/models/review/review'
import { deleteOne } from '../../factory/delete-one-factory'

export const deleteReview = deleteOne(ReviewModel)
