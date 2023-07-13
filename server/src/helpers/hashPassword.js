import bcrypt from 'bcryptjs'

export const hashPassword = password => {
  const cleanPassword = password.trim()
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(cleanPassword, salt)
  return hash
}

export const comparePasswordWithHash = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword)
}
