const db = require('../database/db')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAdmin = (req, res) => {
    const q = 'SELECT * FROM admins'
    db.query(q, (err, data) => { 
        if(err) return res.json(err)
        return res.json({ data })
    })
}

const regAdmin = (req, res) => {
    const { firstName, lastName, userName, password, email, mobile } = req.body
    const enc_password = bcrypt.hashSync(password, 10)
    const values = [firstName, lastName, userName, enc_password, email, mobile]

    if( !firstName || !lastName || !userName || !password || !email || !mobile ){
        return res.json({message: 'Please fill all the fields'})
    }

    db.query('SELECT * FROM admins WHERE admin_username = ?', userName, (err, resp) => {
        if(err) return res.sendStatus(500)
        if(resp.length > 0){
            return res.status(409).json({ message: 'Username already taken'})
        }
    db.query('INSERT INTO admins (admin_firstname, admin_lastname, admin_username, admin_password, admin_email, admin_mobile) VALUES (?, ?, ?, ?, ?, ?)', values, (err, data) => {
        if(err) return res.status(500).json(err)
        return res.json({ message: "Registration Successful"})
    })
    })
}

const login = (req, res) => { 
    const { username, password } = req.body
    if( !username, !password ){
        return res.status(401).json({ message: 'Please enter username and password'})
    }
    db.query('SELECT * FROM admins WHERE admin_username = ?', username, (err, resp) => {
        if(err) return res.json(err)
        if(resp.length > 0) { 
            const admin = resp[0]
            bcrypt.compare(password, admin.admin_password, (err, data) => {
                if(err) return res.json(err)
                if(data){
                    const token = jwt.sign( 
                        { id: admin.admin_id, role: admin.admin_role },
                        process.env.ACCESS_TOKEN_SECRET
                    )
                    res.cookie("token", token, {httpOnly: true});
                    return res.json({resp});
                }else{
                    return res.json({ message: 'Username and password does not match'})
                }
            })
        }else{ 
            return res.status(401).json({ message: 'User does not exist'})
        }
    })
}

module.exports = { getAdmin, regAdmin, login }