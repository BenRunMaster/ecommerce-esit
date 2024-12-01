const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true, // Espera si no hay conexiones disponibles en el pool
    connectionLimit: 50, // Aumenta el límite si esperas alta concurrencia
    queueLimit: 100, // Número máximo de solicitudes en espera
    connectTimeout: 10000, // Tiempo máximo para establecer una conexión (ms)
    ssl: {
        cert: fs.readFileSync('C:/xampp/apache/bin/server-cert.pem'), 
        key: fs.readFileSync('C:/xampp/apache/bin/server-key.pem'), 
        ca: fs.readFileSync('C:/xampp/apache/bin/server-cert.pem'), 
    },
});

module.exports = pool;
