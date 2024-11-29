const jwt = require('jsonwebtoken'); 
const {generalLogger} = require('../utils/logger');
const Usuario = require('../models/usuariosModel'); 

const loginUsuario = async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const user = await Usuario.login(correo, contrasena);
        if (!user) {
            generalLogger.warn(`Intento de inicio de sesión fallido para el correo: ${correo}`);
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const token = jwt.sign(
            { id: user.usuario_id, nombre: user.nombre, correo: user.correo },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        generalLogger.info(`Inicio de sesión exitoso para el usuario: ${correo}`);
        res.json({ token });
    } catch (error) {
        generalLogger.error(`Error al intentar iniciar sesión para ${correo}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.getAll();
        generalLogger.info('Se obtuvieron todos los usuarios');
        res.json(usuarios);
    } catch (error) {
        generalLogger.error(`Error al obtener usuarios: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.getById(req.params.id);
        if (!usuario) {
            generalLogger.warn(`Usuario con ID ${req.params.id} no encontrado`);
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        generalLogger.info(`Usuario con ID ${req.params.id} encontrado`);
        res.json(usuario);
    } catch (error) {
        generalLogger.error(`Error al obtener usuario con ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const createUsuario = async (req, res) => {
    const { nombre, correo, contrasena } = req.body;
    try {
        const newUsuario = await Usuario.createUsuario(nombre, correo, contrasena);
        generalLogger.info(`Usuario creado con ID ${newUsuario.id}`);
        res.json(newUsuario);
    } catch (error) {
        generalLogger.error(`Error al crear usuario: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const updateUsuario = async (req, res) => {
    const { nombre, correo, contrasena } = req.body;
    try {
        const updatedUsuario = await Usuario.updateUsuario(req.params.id, nombre, correo, contrasena);
        if (!updatedUsuario) {
            generalLogger.warn(`Usuario con ID ${req.params.id} no encontrado para actualizar`);
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        generalLogger.info(`Usuario con ID ${req.params.id} actualizado`);
        res.json({ message: 'Usuario actualizado' });
    } catch (error) {
        generalLogger.error(`Error al actualizar usuario con ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const deleteUsuario = async (req, res) => {
    try {
        const deletedUsuario = await Usuario.deleteUsuario(req.params.id);
        if (!deletedUsuario) {
            generalLogger.warn(`Usuario con ID ${req.params.id} no encontrado para eliminar`);
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        generalLogger.info(`Usuario con ID ${req.params.id} eliminado`);
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        generalLogger.error(`Error al eliminar usuario con ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    loginUsuario,
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
};
