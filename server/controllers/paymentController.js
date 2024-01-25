const db = require('../database/db')

const getAllBills = (req, res) => {
    db.query('SELECT P.payment_id, P.month, P.user_electricity, P.user_water, P.user_monthly, P.status, U.user_firstname, U.user_lastname, U.user_mobile FROM payments AS P INNER JOIN users AS U ON P.user_id = U.user_id', (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

const getUserBill = (req, res) => {
    const userId = req.params.id
    db.query('SELECT P.month, P.user_electricity, P.user_water, P.user_monthly, P.status, U.user_firstname, U.user_lastname FROM payments as P INNER JOIN users AS U ON P.user_id = U.user_id WHERE U.user_id = ?', userId, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

const getAllPaidBills = (req, res) => {
    db.query('SELECT P.payment_id, P.month, P.user_electricity, P.user_water, P.user_monthly, P.status, U.user_firstname, U.user_lastname, U.user_mobile FROM payments AS P INNER JOIN users AS U ON P.user_id = U.user_id WHERE p.status = "paid" ', (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

const getAllUnpaidBills = (req, res) => {
    db.query('SELECT P.payment_id, P.month, P.user_electricity, P.user_water, P.user_monthly, P.status, U.user_firstname, U.user_lastname, U.user_mobile FROM payments AS P INNER JOIN users AS U ON P.user_id = U.user_id WHERE p.status = "unpaid" ', (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

const createBill = (req, res) => {
    const { month, user_id, electricity, water, monthly } = req.body;
    const values = [month, user_id, electricity, water, monthly];
    if(!month || !user_id || !electricity || !water || !monthly){
        return res.status(401).json({message: 'Please fill all the fields'})
    }
    db.query("INSERT INTO payments (month, user_id, user_electricity, user_water, user_monthly) VALUES (?, ?, ?, ?, ?)", values, (err, data) => {
        if(err) return res.json(err);
        return res.json({ message: 'Bill Created'})
    })
}

const billPaid = (req, res) => {
    const id  = req.body.id;
    console.log(id)
    db.query("UPDATE payments SET status = 'paid' WHERE payment_id = ?", id, (err, data) => {
        if(err) return res.json(err)
        return res.json({ message: 'Status Updated to Paid'})
    })
}

module.exports = { getAllBills, getUserBill, getAllPaidBills , getAllUnpaidBills, createBill, billPaid}