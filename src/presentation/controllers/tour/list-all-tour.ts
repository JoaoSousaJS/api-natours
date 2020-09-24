import { TourModel } from '../../../data/models/tour'
import { APIFilter } from '../../../main/utils/api-filter'

export const getAllTours = async (req,res): Promise<void> => {
  try {
    const filter = new APIFilter(TourModel.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
    const tours = await filter.query

    res.status(200).json({
      status: 'success',
      data: {
        tours
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}
