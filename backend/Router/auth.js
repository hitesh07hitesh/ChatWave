const express = require("express")
const { register, login, allUsers } = require('../Controllers/authController')
const { protect } = require('../Middleware/authMiddleware')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/find', protect, allUsers)

module.exports = router