const express = require('express');
const { getAllCategorias, getCategoriaById, createCategoria, updateCategoria, deleteCategoria } = require('../controllers/categoriasController');
const router = express.Router();

router.get('/', getAllCategorias);
router.get('/:id', getCategoriaById);
router.post('/', createCategoria);
router.put('/:id', updateCategoria);
router.delete('/:id', deleteCategoria);

module.exports = router;
