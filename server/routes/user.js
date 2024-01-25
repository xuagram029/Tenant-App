const express = require('express')
const { registerUser, getUsers, login, logout, getUser } =  require("../controllers/userController");
const { verifyToken } = require('../utils/verifyToken');
const router = express.Router();

router.route('/')
    .get(getUsers)
    .post(registerUser)
    
router.route('/:id')
    .get(getUser)

router.route('/login')
    .post(login)

router.route('/logout')
    .post(logout)

module.exports = router