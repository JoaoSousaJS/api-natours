import express from 'express'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { tourRouter } from './tour/tour-routes'
import { AppError } from '../../presentation/errors/app-error'
import { globalErrorHandler } from '../../presentation/errors/global-error-handler'
import { userRouter } from './user/user-routes'

export const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour'
})

app.use('/api',limiter)

app.use((req, res, next) => {
  // console.log(req.headers)
  next()
})

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server`) as ErrorStatus
  // err.status = 'fail'
  // err.statusCode = 404

  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler)
