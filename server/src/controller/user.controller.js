import validator from 'validator'
import { HttpStatusCode } from '../constants/httpCodes.js'
import { MSGS_RESPONSES } from '../constants/msgs.js'
import {
  comparePasswordWithHash,
  hashPassword
} from '../helpers/hashPassword.js'
import { loginToken } from '../helpers/loginToken.js'
import User from '../models/user.model.js'

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // First we check if the email entered is valid
    if (!validator.isEmail(email)) {
      return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json({
        msg: MSGS_RESPONSES.INVALID_EMAIL,
        success: false
      })
    }

    // Check if user exists in the DB
    const user = await User.findOne({ email })
    if (user) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        msg: MSGS_RESPONSES.EXISTING_USER,
        success: false
      })
    }

    // Check if all fields have information
    if (!name || !email || !password) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        msg: MSGS_RESPONSES.REQUIRED_FIELDS,
        success: false
      })
    }

    // Check if password is strong
    if (!validator.isStrongPassword(password)) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        msg: MSGS_RESPONSES.WEAK_PASSWORD,
        success: false
      })
    }

    // Check name length
    if (name.length <= 3) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        msg: MSGS_RESPONSES.SHORT_NAME,
        success: false
      })
    }

    // Hash the password
    const securePassword = hashPassword(password)

    const newUser = new User({ name, email, password: securePassword })

    // Save the user in the DB
    await newUser.save()

    // Return a success response with the user's email and the token containing the OTP
    return res.status(HttpStatusCode.CREATED).json({
      msg: MSGS_RESPONSES.REGISTER_USER,
      success: true
    })
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      msg: MSGS_RESPONSES.USER_ERROR,
      success: false,
      error: error.message
    })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // First we check if the email entered is valid
    if (!validator.isEmail(email)) {
      return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json({
        msg: MSGS_RESPONSES.INVALID_EMAIL,
        success: false
      })
    }

    // Retrieve the user from the DB, if exist
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        msg: MSGS_RESPONSES.INVALID_EMAIL_OR_PASS,
        success: false
      })
    }

    // Check if password match with the hashPass in the DB
    const isValidPassword = comparePasswordWithHash(password, user.password)

    if (!isValidPassword) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        msg: MSGS_RESPONSES.INVALID_EMAIL_OR_PASS,
        success: false
      })
    }

    const { name, _id } = user

    // Generate a token
    const token = await loginToken(user._id)

    return res.status(HttpStatusCode.OK).json({
      msg: MSGS_RESPONSES.LOGIN_OK,
      success: true,
      _id,
      name,
      email,
      token
    })
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      msg: MSGS_RESPONSES.LOGIN_ERROR,
      success: false,
      error: error.message
    })
  }
}

export const findSingleUser = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await User.findById(userId)

    if (user) {
      const { email, name, _id } = user

      res.status(HttpStatusCode.OK).json({
        msg: MSGS_RESPONSES.FIND_SINGLE_USER,
        success: true,
        _id,
        name,
        email
      })
    }
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      msg: MSGS_RESPONSES.LOGIN_ERROR,
      success: false,
      error: error.message
    })
  }
}

export const getAllUsers = async (_, res) => {
  try {
    const users = await User.find()
    const usersToFrontEnd = users.map(user => {
      return {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })

    res.status(HttpStatusCode.OK).json({
      msg: MSGS_RESPONSES.FIND_ALL_USERS,
      success: true,
      users: usersToFrontEnd
    })
  } catch (error) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      msg: MSGS_RESPONSES.LOGIN_ERROR,
      success: false,
      error: error.message
    })
  }
}
