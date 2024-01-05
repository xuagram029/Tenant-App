const express = require('express')
const { getAdmin, regAdmin, login } = require('../controllers/adminController')
const { verifyAdmin, verifyUser, verifyToken } = require('../utils/verifyToken')
const router = express.Router()

router.route('/')
    .get(getAdmin)
    .post(regAdmin)

router.route('/login')
    .post(login)
    
module.exports = router