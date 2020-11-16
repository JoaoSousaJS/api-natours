import { NextFunction, Response } from 'express'
import { TourModel } from '../../../data/models/tour/tour'
import { AppError, catchAsync } from '../../errors'

interface IGeoData {
  distance: number
  latlng: string
  unit: string
}

export const getToursWithin = catchAsync(async (req, res: Response, next: NextFunction) => {
  const { distance, latlng, unit }: IGeoData = req.params
  const [lat, lng] = latlng.split(',')

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1

  if (!lat || !lng) {
    next(new AppError('Please, provide latitute and longitude in the format lat, lng.', 400))
  }

  const tours = await TourModel.find({
    startLocation: {
      $geoWithin: {
        $centerSphere: [
          [lng, lat], radius
        ]
      }
    }
  })

  console.log(distance, lat, lng, unit)

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      data: tours
    }
  })
})
