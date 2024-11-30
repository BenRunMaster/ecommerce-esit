const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0,
    ssl: {
        cert: fs.readFileSync('C:/xampp/apache/bin/server-cert.pem'),
        key: fs.readFileSync('C:/xampp/apache/bin/server-key.pem'),
        ca: fs.readFileSync('C:/xampp/apache/bin/server-cert.pem'),
    },
});

module.exports = pool;
