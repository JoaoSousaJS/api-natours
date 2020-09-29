import mongoose, { Schema, Document } from 'mongoose'
import validator from 'validator'

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
    minlength: 8
  }
})

export const UserModel = mongoose.model('User',UserSchema)
