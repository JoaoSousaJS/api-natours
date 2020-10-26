export const getMe = (req, res, next): void => {
  req.params.id = req.user.id
  next()
}
