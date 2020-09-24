import { TourModel } from '../../../data/models/tour'

export const getTour = async (req, res): Promise<void> => {
  try {
    const tour = await TourModel.findById(req.params.id)
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}
