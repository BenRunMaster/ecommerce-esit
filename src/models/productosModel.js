const pool = require('../config/db');

const getAllProductos = async () => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos');
        return rows;
    } catch (error) {
        throw new Error(`Error al obtener productos: ${error.message}`);
    }
};

const getProductoById = async (id) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos WHERE producto_id = ?', [id]);
        return rows[0];
    } catch (error) {
        throw new Error(`Error al obtener el producto con ID ${id}: ${error.message}`);
    }
};

const createProducto = async (nombre, descripcion, precio, stock, categoria_id) => {
    try {
        const result = await pool.query(
            'INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, stock, categoria_id]
        );
        return {
            id: result[0].insertId,
            nombre,
            descripcion,
            precio,
            stock,
            categoria_id,
        };
    } catch (error) {
        throw new Error(`Error al crear producto: ${error.message}`);
    }
};

const updateProducto = async (id, nombre, descripcion, precio, stock, categoria_id) => {
    try {
        const [result] = await pool.query(
            'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria_id = ? WHERE producto_id = ?',
            [nombre, descripcion, precio, stock, categoria_id, id]
        );
        return result.affectedRows > 0; 
    } catch (error) {
        throw new Error(`Error al actualizar producto con ID ${id}: ${error.message}`);
    }
};

const deleteProducto = async (id) => {
    try {
        const [result] = await pool.query('DELETE FROM productos WHERE producto_id = ?', [id]);
        return result.affectedRows > 0; 
    } catch (error) {
        throw new Error(`Error al eliminar producto con ID ${id}: ${error.message}`);
    }
};

module.exports = {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
};
