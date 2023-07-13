import jwt from 'jsonwebtoken'

export const loginToken = userId => {
  return new Promise((resolve, reject) => {
    const payload = { userId }
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' },
      (error, token) => {
        if (error) {
          reject(new Error('Token could not be generated'))
        }
        resolve(token)
      }
    )
  })
}
