const mysql = require('mysql')

const db = mysql.createPool({
    connectionLimit:10,
    host:process.env.HOST || 'localhost',
    user:process.env.USER || 'root',
    password:process.env.PASSWORD || '',
    database:process.env.DATABASE || 'ebooks'
})

module.exports = db