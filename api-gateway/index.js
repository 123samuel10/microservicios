const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Rutas del API Gateway

// Redirige a la API de usuarios
app.get('/users', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3001/users');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los usuarios');
  }
});

// Redirige a la API de productos
app.get('/products', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3002/products');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los productos');
  }
});

// Redirige para crear un nuevo usuario
app.post('/users', express.json(), async (req, res) => {
  try {
    const response = await axios.post('http://localhost:3001/users', req.body);
    res.status(201).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear el usuario');
  }
});

// Redirige para crear un nuevo producto
app.post('/products', express.json(), async (req, res) => {
  try {
    const response = await axios.post('http://localhost:3002/products', req.body);
    res.status(201).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear el producto');
  }
});

// Iniciar el servidor en el puerto 3000
app.listen(port, () => {
  console.log(`API Gateway corriendo en http://localhost:${port}`);
});
