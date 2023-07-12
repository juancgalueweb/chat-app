import mongoose from 'mongoose'
import { MSGS_RESPONSES } from '../constants/msgs.js'
mongoose.set('strictQuery', false)

const LOCAL_DB = process.env.LOCAL_DB_URL

async function dbConnect() {
  try {
    await mongoose.connect(LOCAL_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(MSGS_RESPONSES.DB_CONNECTED)
  } catch (error) {
    console.log(MSGS_RESPONSES.DB_CONNECTION_PROBLEM, error)
  }
}

dbConnect().catch((err) => {
  console.log(err)
})
