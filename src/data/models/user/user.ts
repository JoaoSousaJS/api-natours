import mongoose, { Schema, Document } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

export interface IUserSchema extends Document {
  name: string
  email: string
  photo?: string
  password: string
  passwordConfirmation: string
  comparePassword: (candidatePassword: string, userPassword: string) => Promise<boolean>
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
  }
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

export const UserModel = mongoose.model<IUserSchema>('User',UserSchema)
