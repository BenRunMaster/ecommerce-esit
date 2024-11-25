const express = require('express');
const {
    getAllPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido,
} = require('../controllers/pedidosController');
const router = express.Router();

router.get('/', getAllPedidos);
router.get('/:id', getPedidoById);
router.post('/', createPedido);
router.put('/:id', updatePedido);
router.delete('/:id', deletePedido);

module.exports = router;
