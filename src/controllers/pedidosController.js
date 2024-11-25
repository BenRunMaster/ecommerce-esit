const pool = require('../config/db');

const getAllPedidos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM pedidos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPedidoById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM pedidos WHERE pedido_id = ?', [req.params.id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createPedido = async (req, res) => {
    const { usuario_id, estado, total } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO pedidos (usuario_id, estado, total) VALUES (?, ?, ?)',
            [usuario_id, estado, total]
        );
        res.json({ id: result[0].insertId, usuario_id, estado, total });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePedido = async (req, res) => {
    const { usuario_id, estado, total } = req.body;
    try {
        await pool.query(
            'UPDATE pedidos SET usuario_id = ?, estado = ?, total = ? WHERE pedido_id = ?',
            [usuario_id, estado, total, req.params.id]
        );
        res.json({ message: 'Pedido actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePedido = async (req, res) => {
    try {
        await pool.query('DELETE FROM pedidos WHERE pedido_id = ?', [req.params.id]);
        res.json({ message: 'Pedido eliminado' });
    } catch (error) {
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
