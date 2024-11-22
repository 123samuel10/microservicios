const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

// Configurar conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Cambia según tu configuración
    database: 'products_db'
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a products_db');
    }
});

// Endpoints
app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/products', (req, res) => {
    const { name, price } = req.body;
    db.query('INSERT INTO products (name, price) VALUES (?, ?)', 
        [name, price], 
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId });
        });
});

// Iniciar servidor
app.listen(3002, () => {
    console.log('Servicio de Productos corriendo en http://localhost:3002');
});
