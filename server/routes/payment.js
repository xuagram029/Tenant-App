const express = require('express')
const { getAllBills, getUserBill, getAllPaidBills, getAllUnpaidBills, createBill, billPaid } = require('../controllers/paymentController')
const router = express.Router();


router.route('/')
    .get(getAllBills)
    .post(createBill)
    .put(billPaid)

router.route('/paid')
    .get(getAllPaidBills)

router.route('/unpaid')
    .get(getAllUnpaidBills)

router.route('/:id')
    .get(getUserBill)

module.exports = router