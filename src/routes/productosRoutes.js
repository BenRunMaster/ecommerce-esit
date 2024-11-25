const express = require('express');
const {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
} = require('../controllers/productosController'); // Cambiar a productosController
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Endpoints protegidos
router.get('/', authenticateToken, getAllProductos); // Obtener todos los productos
router.get('/:id', authenticateToken, getProductoById); // Obtener un producto por ID
router.post('/', authenticateToken, createProducto); // Crear un nuevo producto
router.put('/:id', authenticateToken, updateProducto); // Actualizar un producto por ID
router.delete('/:id', authenticateToken, deleteProducto); // Eliminar un producto por ID

module.exports = router;
