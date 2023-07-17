import { Router } from 'express'

import { createMessage, getMessages } from '../controller/message.controller.js'

const router = Router()

router.post('/', createMessage)
router.get('/:chatId', getMessages)

export default router
