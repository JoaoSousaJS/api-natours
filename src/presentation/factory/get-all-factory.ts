import { APIFilter } from '../../main/utils/api-filter'
import { catchAsync } from '../errors'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getAll = (Model): any => {
  return catchAsync(async (req,res, next): Promise<void> => {
    // to allow for nested get reviews on tour
    let filter = {}
    if (req.params.tourId) filter = { tour: req.params.tourId }

    const feature = new APIFilter(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
    const doc = await feature.query

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    })
  })
}
