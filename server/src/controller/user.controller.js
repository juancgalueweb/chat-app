import validator from 'validator'
import { HttpStatusCode } from '../constants/httpCodes.js'
import { MSGS_RESPONSES } from '../constants/msgs.js'
import { hashPassword } from '../helpers/hashPassword.js'
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
