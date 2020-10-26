/* eslint-disable @typescript-eslint/no-floating-promises */
import mongoose from 'mongoose'
import fs from 'fs'
import 'dotenv/config'
import { TourModel } from './models/tour/tour'
import { UserModel } from './models/user/user'
import { ReviewModel } from './models/review/review'

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB connection succesfull')
}).catch(err => {
  console.log('Error: ', err)
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'))
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'))
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'))

const importData = async (): Promise<void> => {
  try {
    await TourModel.create(tours)
    await UserModel.create(users, { validateBeforeSave: false })
    await ReviewModel.create(reviews)
    console.log('Data successfully loaded!')
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

const deleteData = async (): Promise<void> => {
  try {
    await TourModel.deleteMany({})
    await UserModel.deleteMany({})
    await ReviewModel.deleteMany({})
    console.log('Data successfully deleted!')
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}
