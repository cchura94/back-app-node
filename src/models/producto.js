'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Producto.belongsTo(models.Categoria, {
        foreignKey: 'categoriaId'
      });
      // N:M
      Producto.belongsToMany(models.Pedido, {
        through: "PedidoProductos" // nombre de la tabla relación
      });
      // N:M
       Producto.belongsToMany(models.Proveedor, {
        through: "ProductoProveedors" // nombre de la tabla relación
      });
    }
  };
  Producto.init({
    nombre: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    precio: DataTypes.DECIMAL,
    imagen: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    categoriaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};