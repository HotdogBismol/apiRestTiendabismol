const express = require('express'); 
const productosRoutes = require('./rutasProductos'); // Importa las rutas de productos


const app = express();
const PORT = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor REST funcionando correctamente');
});

// Usa las rutas de productos
app.use(productosRoutes);

// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor REST escuchando en http://localhost:${PORT}`);
});

// Se arranca con node index.js brum brum
// Checa que la base de datos esté encendida
