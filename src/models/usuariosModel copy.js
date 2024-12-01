const pool = require('../config/db');
require('dotenv').config();

const getAll = async () => {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    return rows;
};

const getById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario_id = ?', [id]);
    return rows[0];
};

const createUsuario = async (nombre, correo, contrasena) => {
    const result = await pool.query(
        "INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, AES_ENCRYPT(?, SHA2(?,512)))",
        [nombre, correo, contrasena, process.env.PWD_KEY]
    );
    return { id: result[0].insertId, nombre, correo };
};

const updateUsuario = async (id, nombre, correo, contrasena) => {
    const [result] = await pool.query(
        'UPDATE usuarios SET nombre = ?, correo = ?, contrasena = AES_ENCRYPT(?, SHA2(?,512)) WHERE usuario_id = ?',
        [nombre, correo, contrasena, process.env.PWD_KEY, id]
    );
    return result.affectedRows > 0;
};

const deleteUsuario = async (id) => {
    const [result] = await pool.query('DELETE FROM usuarios WHERE usuario_id = ?', [id]);
    return result.affectedRows > 0;
};

const login = async (correo, contrasena) => {
    const [rows] = await pool.query(
        "SELECT * FROM usuarios WHERE correo = ? AND ? = CAST(AES_DECRYPT(contrasena,SHA2(?, 512)) AS CHAR)",
        [correo, contrasena, process.env.PWD_KEY]
    );
    return rows.length > 0 ? rows[0] : null;
};

module.exports = {
    getAll,
    getById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    login
};
