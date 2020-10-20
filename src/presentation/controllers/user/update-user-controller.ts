import { UserModel } from '../../../data/models/user/user'
import { updateOne } from '../../factory'

export const updateUser = updateOne(UserModel)
