import { model, Schema } from 'mongoose'

const chatSchema = new Schema(
  {
    members: {
      type: Array
    }
  },
  { timestamps: true }
)

export default model('Chat', chatSchema)
