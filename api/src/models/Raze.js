const { DataTypes,Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('raze', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notEmpty:true
      }
    },
    id:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    height:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
          notEmpty:true
        }
    },
    weight:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
          notEmpty:true
        }
    },
    lifeSpan:{
        type:DataTypes.STRING,
    },
    img:{
      type:DataTypes.STRING
    }
  });
};