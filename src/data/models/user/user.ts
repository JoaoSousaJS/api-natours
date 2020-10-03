import mongoose, { Schema, Document } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

export interface IUserSchema extends Document {
  name: string
  email: string
  photo?: string
  role?: string
  password: string
  passwordConfirmation: string
  passwordChangedAt: string
  comparePassword: (candidatePassword: string, userPassword: string) => Promise<boolean>
  changedPasswordAfter: (JWTTimeStamp: number) => Promise<boolean>
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
  passwordChangedAt: Date
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

export const UserModel = mongoose.model<IUserSchema>('User',UserSchema)
