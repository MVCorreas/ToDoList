
//?CONFIGURAR Y ESTABLECER CONEXION CON LA BDD POSTGRES MEDIANTE SEQUELIZE (UN ORM DE NODE)
//?ORM --> Object Relational Mapping: tecnica de programacion que mapea objetos de un sist de programacion orientado a objetos (eg. JAVASCRIPT), a estructuras de datos (eg. SQL)


//?CONFIGURACION DE LA BDD
require("dotenv").config(); //Carga las variables de entorno de .env
const { Sequelize } = require("sequelize"); //Crea instancia de Sequelize


const fs = require('fs');
const path = require('path');
const { DataTypes } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env; //Emplea las variables de entonrno para config la URL de conexion

//process.env.DB_HOST = 'localhost';
console.log(process.env.DB_HOST);

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ensolvers`, {
  logging: false, 
  native: false, 
});

console.log(`Dirección IP del host: ${sequelize.config.host}`);

const basename = path.basename(__filename);


//?IMPORTAMOS MODELOS 

// Require the Note model definition file
const noteModelDefiner = require(path.join(__dirname, '/models/Note'));

// Define the Note model
noteModelDefiner(sequelize);

// Capitalize the model name if needed
const Note = require('./models/Note')(sequelize);

// Establish any relationships if needed
// For example:
// Note.belongsTo(User);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};