const express = require('express');
const router = express.Router();

const productos = [
{id:1, nombre:'Pc',precio: 2000, descripcion: 'Computadora de escritorio', stock: 10, categoria: 'Electrónica'},
{id:2, nombre:'Laptop',precio: 3000, descripcion: 'Computadora portátil', stock: 5, categoria: 'Electrónica'},
{id:3, nombre:'Mouse',precio: 50, descripcion: 'Mouse inalámbrico', stock: 20, categoria: 'Electrónica'}

];    

// GET - Obtener todos los productos
router.get('/productos', (req, res) => {
  const { nombre, precio, categoria, descripcion, stock } = req.query;

  const filtered = productos.filter(p => {
    return (
      (nombre == null || p.nombre?.toLowerCase().includes(nombre.toLowerCase())) &&
      (precio == null || p.precio === parseFloat(precio)) &&
      (descripcion == null || p.descripcion?.toLowerCase().includes(descripcion.toLowerCase())) &&
      (stock == null || p.stock === parseInt(stock)) &&
      (categoria == null || p.categoria?.toLowerCase().includes(categoria.toLowerCase()))
    );
  });

  res.json({ success: true, data: filtered });
});

// GET - Obtener un producto por ID
router.get('/productos/:id', (req, res) => {
  const apiKey = req.headers['password'];

if (!apiKey) {
  return res.status(401).json({
    success: false,
    message: 'Error: API Key no proporcionada'
  });
}

if (apiKey !== '123456') {
  return res.status(403).json({
    success: false,
    message: 'Error: la password no es correcta'
  });
}

    const product  = productos.find(u => u.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ success: false, message: 'Producto  no encontrado' });
    } else {
        res.json({ success: true, data: product });
    }

}); 

// ============================
// POST - Crear producto
// ============================
router.post('/productos', (req, res) => {
  const { nombre, precio, descripcion, stock, categoria,  } = req.body;

  if (!nombre || precio == null) {
    return res.status(400).json({
      success: false,
      message: 'Nombre y precio son obligatorios'
    });
  }

const apiKey = req.headers['password'];

if (!apiKey) {
  return res.status(401).json({
    success: false,
    message: 'Error: API Key no proporcionada'
  });
}

if (apiKey !== '123456') {
  return res.status(403).json({
    success: false,
    message: 'Error: la password no es correcta'
  });
}




  const nuevoProducto = {
    id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
    nombre,
    precio,
    descripcion,
    stock,
    categoria,
  };

  productos.push(nuevoProducto);

  res.status(201).json({
    success: true,
    data: nuevoProducto
  });
});



// ============================
// PUT - Actualizar producto por ID
// ============================
router.put('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, precio, descripcion, stock, categoria } = req.body;

  const producto = productos.find(p => p.id === id);

  if (!producto) {
    return res.status(404).json({
      success: false,
      message: 'Producto no encontrado'
    });
  }

  // Actualizar solo si vienen datos
  if (nombre) producto.nombre = nombre;
  if (precio != null) producto.precio = precio;
  if (descripcion) producto.descripcion = descripcion;
  if (stock != null) producto.stock = stock;
  if (categoria) producto.categoria = categoria;

  res.json({
    success: true,
    data: producto
  });
});


// ============================
// DELETE - Eliminar producto por ID
// ============================
router.delete('/productos/:id', (req, res) => {
  const apiKey = req.headers['password'];

if (!apiKey) {
  return res.status(401).json({
    success: false,
    message: 'Error: API Key no proporcionada'
  });
}

if (apiKey !== '123456') {
  return res.status(403).json({
    success: false,
    message: 'Error: la password no es correcta'
  });
}

  const id = parseInt(req.params.id);

  const index = productos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Producto no encontrado'
    });
  }

  const eliminado = productos.splice(index, 1);

  res.json({
    success: true,
    data: eliminado[0]
  });
});

module.exports = router;