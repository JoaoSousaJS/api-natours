import express from 'express'
import morgan from 'morgan'
import { tourRouter } from './tour/tour-routes'
import { AppError } from '../../presentation/errors/app-error'
import { globalErrorHandler } from '../../presentation/errors/global-error-handler'

export const app = express()
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/v1/tours', tourRouter)

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server`) as ErrorStatus
  // err.status = 'fail'
  // err.statusCode = 404

  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler)
