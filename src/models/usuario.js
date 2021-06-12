'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Usuario.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "El campo email no deberia estar vacio"},
        isEmail: {
          msg: "El correo debe ser valido"
        }
      },
      unique: {
        args: true,
        msg: "El correo ya existe"
      }
    },
    password: DataTypes.STRING,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Usuario',
    paranoid: true,
    
  });
  return Usuario;
};