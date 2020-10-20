import { UserModel } from '../../../data/models/user/user'
import { deleteOne } from '../../factory/delete-one-factory'

export const deleteUser = deleteOne(UserModel)
