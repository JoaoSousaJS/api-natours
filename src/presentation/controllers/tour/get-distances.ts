import { TourModel } from '../../../data/models/tour/tour'
import { AppError, catchAsync } from '../../errors'
import { IGeoData } from '../interface/geo-interface'

export const getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit }: IGeoData = req.params
  const [lat, lng] = latlng.split(',')

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001

  if (!lat || !lng) {
    next(new AppError('Please, provide latitute and longitude in the format lat, lng.', 400))
  }

  const distances = await TourModel.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [Number(lng), Number(lat)]
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier
      }
    },
    {
      $project: {
        distance: 1,
        name: 1
      }
    }
  ])

  res.status(200).json({
    status: 'success',
    data: {
      data: distances
    }
  })
})
