const mysql = require('mysql2/promise'); // <-- importante
require('dotenv').config();

// Configuración de la conexión a la base de datos
const env = process.env.NODE_ENV;

const db = mysql.createPool({ 
  host:
    env === 'production'
      ? process.env.DB_HOST_PRD
      : process.env.DB_HOST_DESA,
  user:
    env === 'production'
      ? process.env.DB_USER_PRD
      : process.env.DB_USER_DESA,
  password:
    env === 'production'
      ? process.env.DB_PASS_PRD
      : process.env.DB_PASS_DESA,
  database:
    env === 'production'
      ? process.env.DB_NAME_PRD
      : process.env.DB_NAME_DESA,
    
    port: process.env.DB_PORT || 3306, // por defecto si no lo define
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = db;