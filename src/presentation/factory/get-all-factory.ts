import { APIFilter } from '../../main/utils/api-filter'
import { catchAsync } from '../errors'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getAll = (Model): any => {
  return catchAsync(async (req,res, next): Promise<void> => {
    const filter = new APIFilter(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
    const doc = await filter.query

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    })
  })
}
