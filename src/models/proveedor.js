'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proveedor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 1:1 (HasOne, belongsTo)
      // 1:N (hasMany , belongsTo)
      // N:M (belongsToMany, belongsToMany)
      
      // N:M
      Proveedor.belongsToMany(models.Producto, {
        through: "ProductoProveedors" // nombre de la tabla relación
      });
    }
  };
  Proveedor.init({
    nombre: DataTypes.STRING,
    telefono: DataTypes.STRING,
    correo: DataTypes.STRING,
    direccion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Proveedor',
    paranoid: true
  });
  return Proveedor;
};