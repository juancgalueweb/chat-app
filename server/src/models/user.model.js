import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'The user must have a name'],
      minlength: [3, 'The name should have at least 4 characters']
    },
    email: {
      type: String,
      required: [true, 'The user must have a valid e-mail'],
      unique: true,
      maxlength: 200
    },
    password: {
      type: String,
      required: [true, 'The password is mandatory'],
      minlength: 8,
      maxlength: [200, 'Hashed password exceeds 200 characters']
    }
  },
  { timestamps: true }
)

export default model('User', userSchema)
