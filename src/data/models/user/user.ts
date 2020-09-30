import mongoose, { Schema, Document } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

interface IUserSchema extends Document {
  name: string
  email: string
  photo: string
  password: string
  passwordConfirmation: string
}

const UserSchema: Schema = new Schema({
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
    minlength: 8
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

export const UserModel = mongoose.model('User',UserSchema)
