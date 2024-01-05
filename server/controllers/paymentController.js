const db = require('../database/db')

const getAllBills = (req, res) => {
    db.query('SELECT * FROM payments', (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

const getUserBill = (req, res) => {
    const userId = req.params.id
    db.query('SELECT P.month, P.user_electricity, P.user_water, P.user_monthly, P.status FROM payments as P INNER JOIN users AS U ON P.user_id = U.user_id WHERE U.user_id = ?', userId, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}

module.exports = { getAllBills, getUserBill }