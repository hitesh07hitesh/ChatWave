const express = require('express')
const { accessChat, fetchAllChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require('../Controllers/chatController')
const { protect } = require('../Middleware/authMiddleware')


const router = express.Router()

router.post('/', protect, accessChat)
router.get('/', protect, fetchAllChats)
router.post('/group', protect, createGroupChat)
router.put('/rename', protect, renameGroup)
router.put('/add', protect, addToGroup)
router.put('/remove', protect, removeFromGroup)

module.exports = router