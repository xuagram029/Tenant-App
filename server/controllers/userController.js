const db = require('../database/db')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const getUsers = (req, res) => {
    db.query("SELECT * FROM users", (err, resp) => {
        if(err) return res.status(500)
        return res.json(resp)
    })
}

const registerUser = (req, res) => {
    const { firstName, lastName, userName, password, email, mobile } = req.body
    const enc_password = bcrypt.hashSync(password, 10)
    const values = [firstName, lastName, userName, enc_password, email, mobile]

    if( !firstName || !lastName || !userName || !password || !email || !mobile ){
        return res.json({message: 'Please fill all the fields'})
    }

    db.query('SELECT * FROM users WHERE user_username = ?', userName, (err, resp) => {
      if (err) return res.sendStatus(500);
      if(resp.length > 0){ 
        return res.status(409).json({message: "Username already taken"});
      }
      db.query("INSERT INTO users (user_firstname, user_lastname, user_username, user_password, user_email, user_mobile) VALUES (?, ?, ?, ?, ?, ?)", values, (err, result) => { 
        if(err) return res.status(500).json({error: "An error occurred during registration"})
        return res.json({message: "Registration Successful"})
      })
    })
}

const login = (req, res) => {
    const { username, password } = req.body
    if( !username || !password ){
        return res.status(401).json({error: 'Please enter username and password'})
    }

    db.query("SELECT * FROM users WHERE user_username = ?", username, (err, resp) => {
        if(err) return res.status(500).json({message: "An error occurred during login"})

        if(resp.length > 0){
            const user = resp[0]
            bcrypt.compare(password, user.user_password, (err, data) => {
                if (err) {
                    console.error("Error during password comparison:", err);
                    return res.status(500).json({error: "An error occurred during login"});
                  }
                if(data){
                    const token = jwt.sign(
                        {id: user.user_id, role: user.user_role},
                        process.env.ACCESS_TOKEN_SECRET
                    );
                    res.cookie("token", token, {httpOnly: true});
                    return res.json({resp});
                }else {
                    return res.status(401).json({error: "Password and username do not match"});
                }
            })
        }else{
            return res.status(401).json({error: "user does not exist"})
        }
    })
}

const logout = (req, res) => {
    res.clearCookie("token", {
      path: "/",
      domain: "localhost",
    });
  
    res.send("Logged out successfully");
  };

module.exports ={ registerUser, getUsers, login, logout }