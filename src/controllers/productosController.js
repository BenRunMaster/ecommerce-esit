const pool = require('../config/db');

const getAllProductos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductoById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos WHERE producto_id = ?', [req.params.id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProducto = async (req, res) => {
    const { nombre, descripcion, precio, stock, categoria_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, stock, categoria_id]
        );
        res.json({ id: result[0].insertId, nombre, descripcion, precio, stock, categoria_id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProducto = async (req, res) => {
    const { nombre, descripcion, precio, stock, categoria_id } = req.body;
    try {
        await pool.query(
            'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria_id = ? WHERE producto_id = ?',
            [nombre, descripcion, precio, stock, categoria_id, req.params.id]
        );
        res.json({ message: 'Producto actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProducto = async (req, res) => {
    try {
        await pool.query('DELETE FROM productos WHERE producto_id = ?', [req.params.id]);
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
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
