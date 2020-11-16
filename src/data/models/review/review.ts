import mongoose, { Document, Schema } from 'mongoose'
import { TourModel } from '../tour/tour'

export interface IRevirewSchema extends Document {
  review: string
  rating: number
  createdAt?: Date
  tour: string
  user: string
  calcAverageRatings: Function
  aggregate: Function
  findOne: Function
  r: {}
}

const ReviewSchema: Schema = new Schema({
  review: {
    type: String,
    required: [true, 'Review can not be empty'],
    maxlength: [300, 'A review must have less or equal than 300 characters'],
    minlength: [5, 'A tour name must have more or equal than 5 characters']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  tour: {
    type: mongoose.Types.ObjectId,
    ref: 'Tour',
    required: [true, 'Review must belong to a tour.']
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user']
  }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

ReviewSchema.pre<IRevirewSchema>(/^find/, function (next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name'
  // }).populate({
  //   path: 'user',
  //   select: 'name photo'
  // })

  this.populate({
    path: 'user',
    select: 'name photo'
  })

  next()
})

ReviewSchema.statics.calcAverageRatings = async function (tourId: string) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId }
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ])
  if (stats.length > 0) {
    await TourModel.findByIdAndUpdate(tourId, {
      ratingsAverage: stats[0].nRating,
      ratingsQuantity: stats[0].avgRating
    })
  } else {
    await TourModel.findByIdAndUpdate(tourId, {
      ratingsAverage: 0,
      ratingsQuantity: 4.5
    })
  }
}

ReviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.tour)
})

ReviewSchema.pre<IRevirewSchema>(/^findOneAnd/, async function (next) {
  this.r = await this.findOne()
  console.log(this.r)
  next()
})

ReviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRatings(this.r.tour)
})

export const ReviewModel = mongoose.model<IRevirewSchema>('Review', ReviewSchema)
