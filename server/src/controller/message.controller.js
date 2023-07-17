import { isValidObjectId } from 'mongoose'
import { HttpStatusCode } from '../constants/httpCodes.js'
import { MSGS_RESPONSES } from '../constants/msgs.js'
import Message from '../models/message.model.js'

export const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body
  try {
    const isValidChatId = isValidObjectId(chatId)
    const isValidSenderId = isValidObjectId(senderId)

    if (!isValidChatId || !isValidSenderId) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        msg: MSGS_RESPONSES.INVALID_OBJECTID,
        success: false
      })
    }

    const trimmedText = text.trim()
    if (trimmedText.length === 0) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        msg: MSGS_RESPONSES.INVALID_TEXT,
        success: false
      })
    }

    const message = new Message({ chatId, senderId, text: trimmedText })
    const response = await message.save()

    return res.status(HttpStatusCode.OK).json({
      msg: MSGS_RESPONSES.NEW_MSG_OK,
      success: true,
      response
    })
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      msg: MSGS_RESPONSES.NEW_MSG_ERROR,
      success: false,
      error: error.message
    })
  }
}

export const getMessages = async (req, res) => {
  const { chatId } = req.params
  try {
    const isValidChatId = isValidObjectId(chatId)
    if (!isValidChatId) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        msg: MSGS_RESPONSES.INVALID_OBJECTID,
        success: false
      })
    }

    const messages = await Message.find({ chatId })

    return res.status(HttpStatusCode.OK).json({
      msg: MSGS_RESPONSES.MESSAGES_BY_CHAT_ID_OK,
      success: true,
      messages
    })
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      msg: MSGS_RESPONSES.MESSAGES_BY_CHAT_ID_ERROR,
      success: false,
      error: error.message
    })
  }
}
