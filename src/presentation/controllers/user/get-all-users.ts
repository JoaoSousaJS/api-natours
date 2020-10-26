import { UserModel } from '../../../data/models/user/user'
import { getAll } from '../../factory'

export const getAllUsers = getAll(UserModel)
