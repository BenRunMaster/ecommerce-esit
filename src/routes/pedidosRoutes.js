const express = require('express');
const {
    getAllPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido,
} = require('../controllers/pedidosController');
const authenticateToken = require('../middleware/auth'); 
const router = express.Router();

router.get('/', authenticateToken, getAllPedidos); 
router.get('/:id', authenticateToken, getPedidoById); 
router.post('/', authenticateToken, createPedido); 
router.put('/:id', authenticateToken, updatePedido); 
router.delete('/:id', authenticateToken, deletePedido); 

module.exports = router;
