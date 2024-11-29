const pool = require('../config/db');

const getAllPedidos = async () => {
    try {
        const [pedidos] = await pool.query('SELECT * FROM pedidos');
        const [detalles] = await pool.query('SELECT * FROM detalles_pedido');
        
        const pedidosConDetalles = pedidos.map(pedido => ({
            ...pedido,
            detalles: detalles.filter(detalle => detalle.pedido_id === pedido.pedido_id),
        }));

        return pedidosConDetalles;
    } catch (error) {
        throw new Error(`Error al obtener los pedidos: ${error.message}`);
    }
};

const getPedidoById = async (id) => {
    try {
        const [pedido] = await pool.query('SELECT * FROM pedidos WHERE pedido_id = ?', [id]);
        if (!pedido.length) return null; 
        const [detalles] = await pool.query('SELECT * FROM detalles_pedido WHERE pedido_id = ?', [id]);
        return {
            ...pedido[0],
            detalles,
        };
    } catch (error) {
        throw new Error(`Error al obtener el pedido con ID ${id}: ${error.message}`);
    }
};

const createPedido = async (usuario_id, estado, total, productos) => {
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
        return { id: pedido_id, usuario_id, estado, total };
    } catch (error) {
        await connection.rollback();
        throw new Error(`Error al crear el pedido: ${error.message}`);
    } finally {
        connection.release();
    }
};


const updatePedido = async (id, usuario_id, estado, total, productos) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        await connection.query(
            'UPDATE pedidos SET usuario_id = ?, estado = ?, total = ? WHERE pedido_id = ?',
            [usuario_id, estado, total, id]
        );

        
        await connection.query('DELETE FROM detalles_pedido WHERE pedido_id = ?', [id]);

      
        for (const producto of productos) {
            const { producto_id, cantidad, precio_unitario } = producto;
            await connection.query(
                'INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
                [id, producto_id, cantidad, precio_unitario]
            );
        }

        await connection.commit();
        return true; 
    } catch (error) {
        await connection.rollback();
        throw new Error(`Error al actualizar el pedido con ID ${id}: ${error.message}`);
    } finally {
        connection.release();
    }
};


const deletePedido = async (id) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        await connection.query('DELETE FROM detalles_pedido WHERE pedido_id = ?', [id]);
        await connection.query('DELETE FROM pedidos WHERE pedido_id = ?', [id]);
        await connection.commit();
        return true; 
    } catch (error) {
        await connection.rollback();
        throw new Error(`Error al eliminar el pedido con ID ${id}: ${error.message}`);
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
