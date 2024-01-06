const express = require('express')
const { allMessage, sendMessage } = require('../Controllers/messageController')
const { protect } = require('../Middleware/authMiddleware')

const router = express.Router()

router.get('/:chatId', protect, allMessage)
router.post('/', protect, sendMessage)

module.exports = router