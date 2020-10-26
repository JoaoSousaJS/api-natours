import { UserModel } from '../../../data/models/user/user'
import { getOne } from '../../factory'

export const getUser = getOne(UserModel)
