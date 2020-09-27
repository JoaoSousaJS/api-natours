// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function globalErrorHandler (err, req, res, next) {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
}
