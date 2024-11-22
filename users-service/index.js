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
    database: 'users_db'
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a users_db');
    }
});

// Endpoints
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/users', (req, res) => {
    const { name, email, password } = req.body;
    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
        [name, email, password], 
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ id: result.insertId });
        });
});

// Iniciar servidor
app.listen(3001, () => {
    console.log('Servicio de Usuarios corriendo en http://localhost:3001');
});
