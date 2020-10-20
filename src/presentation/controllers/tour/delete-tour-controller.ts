import { TourModel } from '../../../data/models/tour/tour'
import { deleteOne } from '../../factory/delete-one-factory'

export const deleteTour = deleteOne(TourModel)

// export const deleteTour = catchAsync(async (req,res, next): Promise<void> => {
//   const tour = await TourModel.findByIdAndDelete(req.params.id)

//   if (!tour) {
//     return next(new AppError('No tour found with that ID', 404))
//   }

//   res.status(200).json({
//     status: 'success',
//     message: 'Tour deleted sucessfully'
//   })
// })
