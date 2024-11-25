const pool = require('../config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const loginUsuario = async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const [rows] = await pool.query(
            "SELECT * FROM usuarios WHERE correo = ? AND ? = CAST(AES_DECRYPT(contrasena,SHA2(?, 512)) AS CHAR)",
            [correo, contrasena, process.env.PWD_KEY]
        );
       
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const user = rows[0];
        const token = jwt.sign(
            { id: user.usuario_id, nombre: user.nombre, correo: user.correo },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAllUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUsuarioById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario_id = ?', [req.params.id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUsuario = async (req, res) => {
    const { nombre, correo, contrasena } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)',
            [nombre, correo, contrasena]
        );
        res.json({ id: result[0].insertId, nombre, correo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUsuario = async (req, res) => {
    const { nombre, correo, contrasena } = req.body;
    try {
        await pool.query(
            'UPDATE usuarios SET nombre = ?, correo = ?, contrasena = ? WHERE usuario_id = ?',
            [nombre, correo, contrasena, req.params.id]
        );
        res.json({ message: 'Usuario actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUsuario = async (req, res) => {
    try {
        await pool.query('DELETE FROM usuarios WHERE usuario_id = ?', [req.params.id]);
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    loginUsuario
};
