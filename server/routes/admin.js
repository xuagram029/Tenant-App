const express = require('express')
const { getAdmin, regAdmin, login, logout } = require('../controllers/adminController')
const { verifyAdmin, verifyUser, verifyToken } = require('../utils/verifyToken')
const router = express.Router()

router.route('/')
    .get(getAdmin)
    .post(regAdmin)

router.route('/login')
    .post(login)

router.route('/logout')
    .post(logout)
    
module.exports = router