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
    type: String,
    required: [true, 'A User must have a photo']
  },
  password: {
    type: String,
    required: [true, 'A User must have a password'],
    minlength: [6, 'The password must have more than 6 letters']
  },
  passwordConfirmation: {
    type: String,
    required: [true, 'A User must have a password'],
    minlength: [6, 'The password must have more than 6 letters']
  }
})

export const UserModel = mongoose.model('User',UserSchema)
