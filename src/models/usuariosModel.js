const pool = require('../config/db');
require('dotenv').config();

const getAll = async () => {
    const [rows] = await pool.query('CALL consultar_usuarios()');
    return rows[0]; 
};

const getById = async (id) => {
    const [rows] = await pool.query('CALL consultar_usuario_por_id(?)', [id]);
    return rows[0][0]; 
};

const createUsuario = async (nombre, correo, contrasena) => {
    const [result] = await pool.query(
        'CALL agregar_usuario(?, ?, ?)', 
        [nombre, correo, contrasena]
    );
    return { id: result.insertId, nombre, correo }; 
};

const updateUsuario = async (id, nombre, correo, contrasena) => {
    const [result] = await pool.query(
        'CALL actualizar_usuario(?, ?, ?, ?)', 
        [id, nombre, correo, contrasena]
    );
    return result.affectedRows > 0; 
};

const deleteUsuario = async (id) => {
    const [result] = await pool.query('CALL eliminar_usuario(?)', [id]);
    return result.affectedRows > 0; 
};

const login = async (correo, contrasena) => {
    const [rows] = await pool.query('CALL verificar_usuario(?, ?)', [correo, contrasena]);
    return rows[0][0] || null; 
};

module.exports = {
    getAll,
    getById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    login
};
