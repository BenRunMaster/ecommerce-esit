const logger = require('../utils/logger');
const Categoria = require('../models/categoriasModel'); // Modelo para la capa de datos

const getAllCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.getAll();
        logger.info('Se obtuvieron todas las categorías');
        res.json(categorias);
    } catch (error) {
        logger.error(`Error al obtener categorías: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const getCategoriaById = async (req, res) => {
    try {
        const categoria = await Categoria.getById(req.params.id);
        if (!categoria) {
            logger.warn(`Categoría con ID ${req.params.id} no encontrada`);
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        logger.info(`Categoría con ID ${req.params.id} encontrada`);
        res.json(categoria);
    } catch (error) {
        logger.error(`Error al obtener categoría con ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const createCategoria = async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        const newCategoria = await Categoria.createCategoria(nombre, descripcion);
        logger.info(`Categoría creada con ID ${newCategoria.id}`);
        res.json(newCategoria);
    } catch (error) {
        logger.error(`Error al crear categoría: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const updateCategoria = async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        const updatedCategoria = await Categoria.updateCategoria(req.params.id, nombre, descripcion);
        if (!updatedCategoria) {
            logger.warn(`Categoría con ID ${req.params.id} no encontrada para actualizar`);
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        logger.info(`Categoría con ID ${req.params.id} actualizada`);
        res.json({ message: 'Categoría actualizada' });
    } catch (error) {
        logger.error(`Error al actualizar categoría con ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

const deleteCategoria = async (req, res) => {
    try {
        const deletedCategoria = await Categoria.deleteCategoria(req.params.id);
        if (!deletedCategoria) {
            logger.warn(`Categoría con ID ${req.params.id} no encontrada para eliminar`);
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        logger.info(`Categoría con ID ${req.params.id} eliminada`);
        res.json({ message: 'Categoría eliminada' });
    } catch (error) {
        logger.error(`Error al eliminar categoría con ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllCategorias,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria,
};
