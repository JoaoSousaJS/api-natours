import express from 'express'
import morgan from 'morgan'
import { tourRouter } from './tour/tour-routes'

export const app = express()
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/v1/tours', tourRouter)

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`
  })
})
