const express = require('express');
const app = express();
const PORT = 3000;

const ProductosRoutes = require('./productos/ProductosRoutes.js');
const usuarioRoutes = require('./usuarios/UsuariosRoutes');
app.use(express.json());

app.use('/api',usuarioRoutes);
app.use('/api', ProductosRoutes);


// Iniciar servidor
app.listen(PORT, () => console.log('API arriba!'));