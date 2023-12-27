const jwt = require('jsonwebtoken')
require("dotenv").config();

const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({ message: "You are not authenticated" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).json({ message: "token is not valid" });
        req.user = user
        next()
    })
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.id === req.params.id || req.user.role === 'admin'){
            next()
        }else{
            return res.status(403).json({message: "you are not authorized"})
        }
    })
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.role === 'admin'){
            next()
        }else{
            return res.status(403).json({message: "you are not authorized"})
        }
    })
}

module.exports = { verifyToken, verifyUser, verifyAdmin }