const logger = require('../utils/logger');
const Pedido = require('../models/pedidosModel'); 


const getAllPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.getAllPedidos();
        logger.info('Se obtuvieron todos los pedidos');
        res.json(pedidos);
    } catch (error) {
        logger.error(`Error al obtener los pedidos: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const getPedidoById = async (req, res) => {
    try {
        const pedido = await Pedido.getPedidoById(req.params.id);
        if (!pedido) {
            logger.warn(`Pedido con ID ${req.params.id} no encontrado`);
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        logger.info(`Pedido con ID ${req.params.id} encontrado`);
        res.json(pedido);
    } catch (error) {
        logger.error(`Error al obtener el pedido con ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const createPedido = async (req, res) => {
    const { usuario_id, estado, total, productos } = req.body;

    if (!productos || !Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ error: 'Se requiere una lista de productos para el pedido' });
    }

    try {
        const nuevoPedido = await Pedido.createPedido(usuario_id, estado, total, productos);
        logger.info(`Pedido creado con ID ${nuevoPedido.id}`);
        res.json(nuevoPedido);
    } catch (error) {
        logger.error(`Error al crear el pedido: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const updatePedido = async (req, res) => {
    const { usuario_id, estado, total, productos } = req.body;

    if (!productos || !Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ error: 'Se requiere una lista de productos para actualizar el pedido' });
    }

    try {
        const pedidoActualizado = await Pedido.updatePedido(req.params.id, usuario_id, estado, total, productos);
        if (!pedidoActualizado) {
            logger.warn(`Pedido con ID ${req.params.id} no encontrado para actualizar`);
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        logger.info(`Pedido con ID ${req.params.id} actualizado`);
        res.json({ message: 'Pedido actualizado' });
    } catch (error) {
        logger.error(`Error al actualizar el pedido con ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const deletePedido = async (req, res) => {
    try {
        const pedidoEliminado = await Pedido.deletePedido(req.params.id);
        if (!pedidoEliminado) {
            logger.warn(`Pedido con ID ${req.params.id} no encontrado para eliminar`);
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }
        logger.info(`Pedido con ID ${req.params.id} eliminado`);
        res.json({ message: 'Pedido eliminado' });
    } catch (error) {
        logger.error(`Error al eliminar el pedido con ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido,
};
