import moongose from 'mongoose'
import 'dotenv/config'
import { app } from '../infra/routes/app'

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

moongose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB connection succesfull')
}).catch(err => {
  console.log('Error: ', err)
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`server running on port ${port}...`)
})
