const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const categoriasRoutes = require('./routes/categoriasRoutes');
const productosRoutes = require('./routes/productosRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/categorias', categoriasRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
