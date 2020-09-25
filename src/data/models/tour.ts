import moongose, { Document, Schema } from 'mongoose'
import slugify from 'slugify'
export interface ITourSchema extends Document {
  name: string
  duration: Number
  maxGroupSize: Number
  difficulty: string
  ratingsAverage: Number
  ratingsQuantity: Number
  price: Number
  priceDiscount: Number
  summary: string
  description: string
  imageCover: string
  images: [string]
  createdAt: Date
  startDates: [Date]
  slug: string
}

const TourSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true
  },
  slug: String,
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true,'A tour must have a price']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  startDates: [Date]
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

TourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7
})

// document middleware
TourSchema.pre<ITourSchema>('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

// TourSchema.pre<ITourSchema>('save', function (next) {
//   console.log('Will save document...')
//   next()
// })

// TourSchema.post('save', function (doc, next) {
//   console.log(doc)
//   next()
// })

export const TourModel = moongose.model('Tour', TourSchema)
