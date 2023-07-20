import jwt from 'jsonwebtoken'
import { MSGS_RESPONSES } from '../constants/msgs.js'

export const loginToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId }
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: '24h' },
      (error, token) => {
        if (error) {
          reject(new Error(MSGS_RESPONSES.LOGIN_TOKEN_ERROR))
        }
        resolve(token)
      }
    )
  })
}
