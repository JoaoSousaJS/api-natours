import { TourModel } from '../../../data/models/tour'

export const deleteTour = async (req,res): Promise<void> => {
  try {
    await TourModel.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status: 'success',
      message: 'Tour deleted sucessfully'
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}
