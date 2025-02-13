const express = require('express');
const router = express.Router();
const connection = require('./db'); // Archivo de la conexión de la base de datos

// Rutas relacionadas con usuarios
router.get('/gUsuarios', (req, res) => {
    const query = 'SELECT * FROM usuarios';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta', err);
            return res.status(500).send('Error al obtener los usuarios');
        }
        res.json(results);
    });
});

router.post('/pUsuarios', (req, res) => {
    const { nombre, contrasena, telefono, foto, correo, tipo } = req.query;
    const query = 'INSERT INTO usuarios (nombre, contrasena, telefono, foto, correo, tipo) VALUES (?, ?, ?, ?, ?, ?)';

    connection.query(query, [nombre, contrasena, telefono, foto, correo, tipo], (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta', err);
            return res.status(500).send('Error al crear el usuario');
        }
        res.status(201).send('Usuario creado correctamente');
    });
});

router.put('/eUsuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, contrasena, telefono, foto, correo, tipo } = req.query;
    const query = 'UPDATE usuarios SET nombre = ?, contrasena = ?, telefono = ?, foto = ?, correo = ?, tipo = ? WHERE id = ?';

    connection.query(query, [nombre, contrasena, telefono, foto, correo, tipo, id], (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta', err);
            return res.status(500).send('Error al actualizar el usuario');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.send('Usuario actualizado correctamente');
    });
});

router.delete('/dUsuarios/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM usuarios WHERE id = ?';

    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta', err);
            return res.status(500).send('Error al eliminar el usuario');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.send('Usuario eliminado correctamente');
    });
});

module.exports = router;
