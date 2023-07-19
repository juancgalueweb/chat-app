import { isValidObjectId } from 'mongoose'
import { HttpStatusCode } from '../constants/httpCodes.js'
import { MSGS_RESPONSES } from '../constants/msgs.js'
import Chat from '../models/chat.model.js'
import User from '../models/user.model.js'

export const createChat = async (req, res) => {
  const { firstId, secondId } = req.body
  try {
    const isValidFirstId = isValidObjectId(firstId)
    const isValidSecondId = isValidObjectId(secondId)

    if (!isValidFirstId || !isValidSecondId) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        msg: MSGS_RESPONSES.INVALID_OBJECTID,
        success: false
      })
    }

    // Check if user exist
    const userOne = await User.findById(firstId)
    const userTwo = await User.findById(secondId)

    if (!userOne || !userTwo) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        msg: MSGS_RESPONSES.UNKNOWN_USER,
        success: false
      })
    }

    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] }
    })

    if (chat) {
      return res.status(HttpStatusCode.OK).json({
        msg: MSGS_RESPONSES.CHAT_FOUND,
        success: true,
        chat
      })
    }

    const newChat = new Chat({ members: [firstId, secondId] })
    const response = await newChat.save()

    return res.status(HttpStatusCode.OK).json({
      msg: MSGS_RESPONSES.CREATE_NEW_CHAT,
      success: true,
      chat: response
    })
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      msg: MSGS_RESPONSES.CREATE_CHAT_ERROR,
      success: false,
      error: error.message
    })
  }
}

export const findUserChats = async (req, res) => {
  const { userId } = req.params
  try {
    // Check if userId is a valid ObjectId
    if (!isValidObjectId(userId)) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        msg: MSGS_RESPONSES.INVALID_OBJECTID,
        success: false
      })
    }

    // Check if user exist
    const user = await User.findById(userId)
    if (!user) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        msg: MSGS_RESPONSES.FIND_USER_CHATS_WRONG_ID,
        success: false
      })
    }

    const chats = await Chat.find({
      members: { $in: [userId] }
    })

    return res.status(HttpStatusCode.OK).json({
      msg: MSGS_RESPONSES.FIND_USER_CHATS_OK,
      chats
    })
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      msg: MSGS_RESPONSES.FIND_USER_CHATS_ERROR,
      success: false,
      error: error.message
    })
  }
}

export const findChat = async (req, res) => {
  const { firstId, secondId } = req.params
  try {
    const isValidFirstId = isValidObjectId(firstId)
    const isValidSecondId = isValidObjectId(secondId)

    if (!isValidFirstId || !isValidSecondId) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        msg: MSGS_RESPONSES.INVALID_OBJECTID,
        success: false
      })
    }

    // Check if user exist
    const userOne = await User.findById(firstId)
    const userTwo = await User.findById(secondId)

    if (!userOne || !userTwo) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        msg: MSGS_RESPONSES.UNKNOWN_USER,
        success: false
      })
    }

    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] }
    })

    return res.status(HttpStatusCode.OK).json({
      msg: MSGS_RESPONSES.FIND_USER_CHAT_OK,
      chat
    })
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      msg: MSGS_RESPONSES.FIND_USER_CHAT_ERROR,
      success: false,
      error: error.message
    })
  }
}
