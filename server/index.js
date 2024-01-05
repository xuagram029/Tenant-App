const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const cookieParser = require('cookie-parser');

const app = express()
const PORT = 8000;

require('dotenv').config();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/users', require('./routes/user'))
app.use('/admins', require('./routes/admin'))
app.use('/bills', require('./routes/payment'))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});