import express from 'express'
import morgan from 'morgan'
import { tourRouter } from './tour/tour-routes'

export const app = express()
app.use(morgan('dev'))
app.use(express.json())

app.use((req, res, next) => {
  console.log('Hello from the middleware')
  next()
})

app.use('/api/v1/tours', tourRouter)
