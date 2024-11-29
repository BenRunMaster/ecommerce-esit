const pool = require('../config/db');

const getAll = async () => {
    const [rows] = await pool.query('SELECT * FROM categorias');
    return rows;
};

const getById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM categorias WHERE categoria_id = ?', [id]);
    return rows[0];
};

const createCategoria = async (nombre, descripcion) => {
    const result = await pool.query('INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
    return { id: result[0].insertId, nombre, descripcion };
};

const updateCategoria = async (id, nombre, descripcion) => {
    const [result] = await pool.query('UPDATE categorias SET nombre = ?, descripcion = ? WHERE categoria_id = ?', [nombre, descripcion, id]);
    return result.affectedRows > 0;
};

const deleteCategoria = async (id) => {
    const [result] = await pool.query('DELETE FROM categorias WHERE categoria_id = ?', [id]);
    return result.affectedRows > 0;
};

module.exports = {
    getAll,
    getById,
    createCategoria,
    updateCategoria,
    deleteCategoria
};
