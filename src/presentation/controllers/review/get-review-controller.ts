import { ReviewModel } from '../../../data/models/review/review'
import { getOne } from '../../factory'

export const getReview = getOne(ReviewModel, { path: 'user' })
