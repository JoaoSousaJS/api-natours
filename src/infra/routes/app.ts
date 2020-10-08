import express, { Request } from 'express'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitze from 'express-mongo-sanitize'
import xss from 'xss-clean'
import hpp from 'hpp'

import { tourRouter } from './tour/tour-routes'
import { AppError } from '../../presentation/errors/app-error'
import { globalErrorHandler } from '../../presentation/errors/global-error-handler'
import { userRouter } from './user/user-routes'

export const app = express()

// limit requests from the same api
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour'
})

app.use('/api', limiter)

// set security http headers
app.use(helmet())

// body parser
app.use(express.json({
  limit: '10kb'
}))

// data sanitization against nosql query injection
app.use(mongoSanitze())

// data sanitization against XSS
app.use(xss())

// prevent parameter polution
app.use(hpp({
  whitelist: [
    'duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price'
  ]
}))

// development loggin
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Test middleware
interface RequestTime extends Request {
  requestTime: string
}

app.use((req: RequestTime, res, next) => {
  req.requestTime = new Date().toISOString()
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
