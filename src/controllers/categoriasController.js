const pool = require('../config/db');

const getAllCategorias = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categorias');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCategoriaById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categorias WHERE categoria_id = ?', [req.params.id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createCategoria = async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        const result = await pool.query('INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
        res.json({ id: result[0].insertId, nombre, descripcion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCategoria = async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        await pool.query('UPDATE categorias SET nombre = ?, descripcion = ? WHERE categoria_id = ?', [nombre, descripcion, req.params.id]);
        res.json({ message: 'Categoría actualizada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCategoria = async (req, res) => {
    try {
        await pool.query('DELETE FROM categorias WHERE categoria_id = ?', [req.params.id]);
        res.json({ message: 'Categoría eliminada' });
    } catch (error) {
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
