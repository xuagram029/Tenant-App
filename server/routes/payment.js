const express = require('express')
const { getAllBills, getUserBill } = require('../controllers/paymentController')
const router = express.Router();


router.route('/')
    .get(getAllBills)

router.route('/:id')
    .get(getUserBill)

module.exports = router