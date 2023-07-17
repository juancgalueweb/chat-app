import { model, Schema } from 'mongoose'

const messageSchema = new Schema(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
      required: [true, 'Chat id is required']
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Sender id is required']
    },
    text: {
      type: String,
      required: [true, 'The message can not be empty']
    }
  },
  { timestamps: true }
)

export default model('Messages', messageSchema)
