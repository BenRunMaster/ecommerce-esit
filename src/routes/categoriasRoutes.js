const express = require('express');
const {
    getAllCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria,
} = require('../controllers/categoriasController');
const authenticateToken = require('../middleware/auth'); 
const router = express.Router();

router.get('/', authenticateToken, getAllCategorias); 
router.get('/:id', authenticateToken, getCategoriaById); 
router.post('/', authenticateToken, createCategoria); 
router.put('/:id', authenticateToken, updateCategoria); 
router.delete('/:id', authenticateToken, deleteCategoria); 

module.exports = router;
