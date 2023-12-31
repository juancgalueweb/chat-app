import cors from 'cors'
import express from 'express'
import chatRoutes from './src/routes/chat.routes.js'
import messageRoutes from './src/routes/message.routes.js'
import userRoutes from './src/routes/user.routes.js'

// Using dotenv
import 'dotenv/config'
// Mongoose config
import './src/config/dbConnection.js'

const app = express()

const port = process.env.PORT || 8001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/users', userRoutes)
app.use('/api/chats', chatRoutes)
app.use('/api/messages', messageRoutes)

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
