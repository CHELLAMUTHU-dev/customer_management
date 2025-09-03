const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({
    path: './.env'
});

const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, 
    port:3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


module.exports = dbConnection;