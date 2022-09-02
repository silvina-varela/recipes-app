const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4, // así se diferencia del que viene de la api, es un id hexadecimal
      allowNull: false,
      primaryKey: true      
    },
    title: {
      type: DataTypes.STRING(60), // máximo de caracteres
      allowNull: false
    },    
    summary: {
      type: DataTypes.STRING(1500), 
      allowNull: false
    },
    healthScore: {
      type: DataTypes.INTEGER,  
    },
    readyInMinutes: {
      type: DataTypes.INTEGER,
    },
    instructions: {
      type: DataTypes.ARRAY(DataTypes.JSON)
    },
    image: {
      type: DataTypes.STRING(2048)
    },
    dishTypes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    // Para verificar que fue creado en la base de datos:
    fromDB : { 
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },{
    timestamps: false
  });
};
