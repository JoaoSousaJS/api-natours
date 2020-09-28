import moongose from 'mongoose'
import 'dotenv/config'
import { app } from '../infra/routes/app'
import { ProcessProtocol } from './protocols/process-protocol'

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

// eslint-disable-next-line @typescript-eslint/no-floating-promises
moongose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB connection succesfull')
})

const port = process.env.PORT || 3000

const server = app.listen(port, () => {
  console.log(`server running on port ${port}...`)
})

process.on('unhandledRejection', (err: ProcessProtocol) => {
  console.log(err.name, err.message)
  console.log('UNHANDLED REJECTION!!Shutting down...')
  server.close(() => {
    process.exit(1)
  })
})
