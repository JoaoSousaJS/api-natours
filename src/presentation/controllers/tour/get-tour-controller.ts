import { TourModel } from '../../../data/models/tour/tour'
import { getOne } from '../../factory/get-one-factory'

export const getTour = getOne(TourModel, { path: 'reviews' })
