/* eslint-disable @typescript-eslint/no-floating-promises */
import mongoose from 'mongoose'
import fs from 'fs'
import 'dotenv/config'
import { TourModel } from './models/tour'

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

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tour-simple.json`, 'utf-8'))

const importData = async (): Promise<void> => {
  try {
    await TourModel.create(tours)
    console.log('Data successfully loaded!')
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

const deleteData = async (): Promise<void> => {
  try {
    await TourModel.deleteMany({})
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
