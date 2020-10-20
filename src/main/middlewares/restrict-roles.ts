import { AppError } from '../../presentation/errors/app-error'

export const restrictTo = (...roles: string[]) => {
  return (req, res, next) => {
    // roles in an array ['admin', 'lead-guide']. role = 'user'
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to do this.', 403))
    }
    next()
  }
}
