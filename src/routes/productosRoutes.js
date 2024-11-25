const express = require('express');
const {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
} = require('../controllers/productosController'); 
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.get('/', authenticateToken, getAllProductos); 
router.get('/:id', authenticateToken, getProductoById); 
router.post('/', authenticateToken, createProducto); 
router.put('/:id', authenticateToken, updateProducto); 
router.delete('/:id', authenticateToken, deleteProducto); 

module.exports = router;
