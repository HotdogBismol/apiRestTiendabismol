const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tiendabismol'
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectarse a la base de datos', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

module.exports = connection;
