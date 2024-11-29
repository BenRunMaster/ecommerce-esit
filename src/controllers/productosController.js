const logger = require('../utils/logger');
const Producto = require('../models/productosModel'); 

const getAllProductos = async (req, res) => {
    try {
        const productos = await Producto.getAllProductos();
        logger.info('Se obtuvieron todos los productos');
        res.json(productos);
    } catch (error) {
        logger.error(`Error al obtener productos: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const getProductoById = async (req, res) => {
    try {
        const producto = await Producto.getProductoById(req.params.id);
        if (!producto) {
            logger.warn(`Producto con ID ${req.params.id} no encontrado`);
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        logger.info(`Producto con ID ${req.params.id} encontrado`);
        res.json(producto);
    } catch (error) {
        logger.error(`Error al obtener producto con ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const createProducto = async (req, res) => {
    const { nombre, descripcion, precio, stock, categoria_id } = req.body;
    try {
        const newProducto = await Producto.createProducto(nombre, descripcion, precio, stock, categoria_id);
        logger.info(`Producto creado con ID ${newProducto.id}`);
        res.json(newProducto);
    } catch (error) {
        logger.error(`Error al crear producto: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const updateProducto = async (req, res) => {
    const { nombre, descripcion, precio, stock, categoria_id } = req.body;
    try {
        const updatedProducto = await Producto.updateProducto(req.params.id, nombre, descripcion, precio, stock, categoria_id);
        if (!updatedProducto) {
            logger.warn(`Producto con ID ${req.params.id} no encontrado para actualizar`);
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        logger.info(`Producto con ID ${req.params.id} actualizado`);
        res.json({ message: 'Producto actualizado' });
    } catch (error) {
        logger.error(`Error al actualizar producto con ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const deleteProducto = async (req, res) => {
    try {
        const deletedProducto = await Producto.deleteProducto(req.params.id);
        if (!deletedProducto) {
            logger.warn(`Producto con ID ${req.params.id} no encontrado para eliminar`);
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        logger.info(`Producto con ID ${req.params.id} eliminado`);
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        logger.error(`Error al eliminar producto con ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
};
