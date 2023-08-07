const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'passport_sql',
    database:'app_db',
    user: 'root',
    password: 'my_secret_password'
})

module.exports = con