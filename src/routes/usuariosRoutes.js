const express = require('express');
const {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    loginUsuario,
} = require('../controllers/usuariosController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/register', createUsuario); 
router.post('/login', loginUsuario);     

router.get('/', authenticateToken, getAllUsuarios);
router.get('/:id', authenticateToken, getUsuarioById);
router.put('/:id', authenticateToken, updateUsuario);
router.delete('/:id', authenticateToken, deleteUsuario);

module.exports = router;
