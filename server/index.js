const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2');
const dotenv = require('dotenv');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 5000

require('./config/db');
require('./auth/passport')

app.use(cors({
    origin:'http://client:3000'
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use('/info', require('./routes/endpoints'))
app.use('/auth', require('./routes/auth'))
app.use('/secret',  passport.authenticate('jwt', {session: false}), require('./routes/secure'))


app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))