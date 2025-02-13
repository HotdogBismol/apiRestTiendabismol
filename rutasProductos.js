const express = require('express');
const router = express.Router();
const connection = require('./db'); // Archivo de la conexión de la base de datos

// Rutas relacionadas con productos
router.get('/gProductos', (req, res) => {
    const query = 'SELECT * FROM producto';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta', err);
            return res.status(500).send('Error al obtener los productos');
        }
        res.json(results);
    });
});

router.post('/pProductos', (req, res) => {
    const { nombre, precio, foto, categoria, costo, descripcion } = req.query;
    const query = 'INSERT INTO producto (nombre, precio, foto, categoria, costo, descripcion) VALUES (?, ?, ?, ?, ?, ?)';

    connection.query(query, [nombre, precio, foto, categoria, costo, descripcion], (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta', err);
            return res.status(500).send('Error al crear el producto');
        }
        res.status(201).send('Producto creado correctamente');
    });
});

router.put('/eProductos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio, foto, categoria, costo, descripcion } = req.query;
    const query = 'UPDATE producto SET nombre = ?, precio = ?, foto = ?, categoria = ?, costo = ?, descripcion = ? WHERE id = ?';

    connection.query(query, [nombre, precio, foto, categoria, costo, descripcion, id], (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta', err);
            return res.status(500).send('Error al actualizar el producto');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Producto no encontrado');
        }
        res.send('Producto actualizado correctamente');
    });
});

router.delete('/dProductos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM producto WHERE id = ?';

    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta', err);
            return res.status(500).send('Error al eliminar el producto');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Producto no encontrado');
        }
        res.send('Producto eliminado correctamente');
    });
});

router.patch('/sProductos/:id', (req, res) => {
    const { id } = req.params;
    const { stock } = req.query;
    const query = 'UPDATE producto SET stock = ? WHERE id = ?';

    connection.query(query, [stock, id], (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta', err);
            return res.status(500).send('Error al actualizar el stock del producto');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Producto no encontrado');
        }
        res.send('Stock del producto actualizado correctamente');
    });
});

module.exports = router;
