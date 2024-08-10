const { DataTypes } = require('sequelize'); //Importamos el objeto de Sequelize que nos permitirá establecer tipos de datos

module.exports = (sequelize) => {
  // defino el modelo, el cual crea una tabla en la BDD
  sequelize.define('Note', {
    id: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50], 
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'other',
      validate: {
        isIn: [['personal', 'work', 'inspirational', 'other']] 
      }
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false 
  }
}, { timestamps: false }); //Evito que se agreguen automáticamente campos de registro de tiempo (como "createdAt" y "updatedAt") a la tabla de la BDD.
}