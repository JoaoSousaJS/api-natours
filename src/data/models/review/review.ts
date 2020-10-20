import mongoose, { Document, Schema } from 'mongoose'

export interface IRevirewSchema extends Document {
  review: string
  rating: number
  createdAt?: Date
  tour: string
  user: string
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
  this.populate({
    path: 'tour',
    select: 'name'
  }).populate({
    path: 'user',
    select: 'name photo'
  })

  next()
})

export const ReviewModel = mongoose.model<IRevirewSchema>('Review', ReviewSchema)
