const pool = require('../config/db');

const getAllPedidos = async (req, res) => {
    try {
        const [pedidos] = await pool.query('SELECT * FROM pedidos');

        const [detalles] = await pool.query('SELECT * FROM detalles_pedido');

        const pedidosConDetalles = pedidos.map(pedido => ({
            ...pedido,
            detalles: detalles.filter(detalle => detalle.pedido_id === pedido.pedido_id),
        }));

        res.json(pedidosConDetalles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPedidoById = async (req, res) => {
    try {
        const [pedido] = await pool.query('SELECT * FROM pedidos WHERE pedido_id = ?', [req.params.id]);

        if (!pedido.length) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        const [detalles] = await pool.query('SELECT * FROM detalles_pedido WHERE pedido_id = ?', [req.params.id]);

        res.json({
            ...pedido[0],
            detalles,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createPedido = async (req, res) => {
    const { usuario_id, estado, total, productos } = req.body;

    if (!productos || !Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ error: 'Se requiere una lista de productos para el pedido' });
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [result] = await connection.query(
            'INSERT INTO pedidos (usuario_id, estado, total) VALUES (?, ?, ?)',
            [usuario_id, estado, total]
        );

        const pedido_id = result.insertId;

        for (const producto of productos) {
            const { producto_id, cantidad, precio_unitario } = producto;
            await connection.query(
                'INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
                [pedido_id, producto_id, cantidad, precio_unitario]
            );
        }

        await connection.commit();
        res.json({ id: pedido_id, usuario_id, estado, total });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
};

const updatePedido = async (req, res) => {
    const { usuario_id, estado, total, productos } = req.body;

    if (!productos || !Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ error: 'Se requiere una lista de productos para actualizar el pedido' });
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        await connection.query(
            'UPDATE pedidos SET usuario_id = ?, estado = ?, total = ? WHERE pedido_id = ?',
            [usuario_id, estado, total, req.params.id]
        );

        await connection.query('DELETE FROM detalles_pedido WHERE pedido_id = ?', [req.params.id]);

        for (const producto of productos) {
            const { producto_id, cantidad, precio_unitario } = producto;
            await connection.query(
                'INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
                [req.params.id, producto_id, cantidad, precio_unitario]
            );
        }

        await connection.commit();
        res.json({ message: 'Pedido actualizado' });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
};

const deletePedido = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        await connection.query('DELETE FROM detalles_pedido WHERE pedido_id = ?', [req.params.id]);

        await connection.query('DELETE FROM pedidos WHERE pedido_id = ?', [req.params.id]);

        await connection.commit();
        res.json({ message: 'Pedido eliminado' });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
};

module.exports = {
    getAllPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido,
};
