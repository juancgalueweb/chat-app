import { model, Schema } from 'mongoose'

const chatSchema = new Schema(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ]
  },
  { timestamps: true }
)

export default model('Chat', chatSchema)
