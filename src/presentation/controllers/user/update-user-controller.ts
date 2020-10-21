import { UserModel } from '../../../data/models/user/user'
import { updateOne } from '../../factory'

// do not update passwords with this!
export const updateUser = updateOne(UserModel)
