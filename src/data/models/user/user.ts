import mongoose, { Schema, Document } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import { randomBytes, createHash } from 'crypto'

export interface IUserSchema extends Document {
  name: string
  email: string
  photo?: string
  role?: string
  password: string
  passwordConfirmation: string
  passwordChangedAt: number
  passwordResetToken?: string
  passwordResetExpires?: number
  find: Function
  comparePassword: (candidatePassword: string, userPassword: string) => Promise<boolean>
  changedPasswordAfter: (JWTTimeStamp: number) => Promise<boolean>
  createPasswordResetToken: () => string
}

export const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'A User must have a name']

  },
  email: {
    type: String,
    required: [true, 'A User must have an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please, provide a valid email']
  },
  photo: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'A User must have a password'],
    minlength: 8,
    select: false
  },
  passwordConfirmation: {
    type: String,
    required: [true, 'A User must have a password'],
    validate: {
      validator: function (el) {
        return el === this.password
      },
      message: 'Passwords are not the same'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
})

UserSchema.pre<IUserSchema>('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next()

  this.passwordChangedAt = Date.now() - 1000
  next()
})

UserSchema.pre<IUserSchema>(/^find/, function (next) {
  // this points to current query
  this.find({ active: { $ne: false } })
  next()
})

UserSchema.pre<IUserSchema>('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirmation = undefined
  next()
})

UserSchema.methods.comparePassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

UserSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = this.passwordChangedAt.getTime() / 1000
    return JWTTimeStamp < changedTimeStamp
  }

  // False means NOT changed
  return false
}

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = randomBytes(32).toString('hex')

  this.passwordResetToken = createHash('sha256').update(resetToken).digest('hex')
  console.log({ resetToken }, this.passwordResetToken)
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  return resetToken
}

export const UserModel = mongoose.model<IUserSchema>('User',UserSchema)
