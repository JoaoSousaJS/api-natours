import moongose, { Document, Schema } from 'mongoose'
import slugify from 'slugify'
import { UserModel } from '../user/user'
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
  find: Function
  start: Number
  startLocation?: {
    type: string
    coordinates: [Number]
    address: string
    description: string
  }
  locations?: [
    {
      type: string
      coordinates: [Number]
      address: string
      description: string
      day: Number
    }
  ]
  guides: object[]
}

const TourSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A tour name must have less or equal than 40 characters'],
    minlength: [10, 'A tour name must have more or equal than 10 characters']
    // validate: [validator.isAlpha, 'the name must contain only letters']
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
    required: [true, 'A tour must have a difficulty'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'The difficulty must be easy, medium or difficult'
    }

  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'A tour varange can not be lower than 1.0'],
    max: [5, 'A tour average can not be higher than 5.0']
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true,'A tour must have a price']
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val: Number) {
        // this only points to current doc on New document creation
        return val < this.price
      },
      message: 'The price discount ({VALUE}) can not be higher than regular price'
    }
  },
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
  startDates: [Date],
  secretTour: {
    type: Boolean,
    default: false
  },
  startLocation: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: [Number],
    address: String,
    description: String
  },
  locations: [
    {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String,
      day: Number
    }
  ],
  guides: Array
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

TourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7
})

// document middleware runs before .save() and .create()
TourSchema.pre<ITourSchema>('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

TourSchema.pre<ITourSchema>('save', async function (next) {
  const guidesPromises = this.guides.map(async id => await UserModel.findById(id))
  this.guides = await Promise.all(guidesPromises)
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

// query middleware
// TourSchema.pre<ITourSchema>('find', function (next) {
TourSchema.pre<ITourSchema>(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } })
  this.start = Date.now()
  next()
})

TourSchema.post<ITourSchema>(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`)
  next()
})

// agregation middleware
TourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } })
  console.log(this.pipeline())
  next()
})

export const TourModel = moongose.model('Tour', TourSchema)
