import { TourModel } from '../../../data/models/tour'

export const createTour = async (req,res): Promise<void> => {
  try {
    const newTour = await TourModel.create(req.body)

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent'
    })
  }
}
