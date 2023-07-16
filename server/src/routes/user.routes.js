import { Router } from 'express'
import {
  findSingleUser,
  getAllUsers,
  login,
  register
} from '../controller/user.controller.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/find/:userId', findSingleUser)
router.get('/', getAllUsers)

export default router
