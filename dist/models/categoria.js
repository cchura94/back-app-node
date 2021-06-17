'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // 1:N
      Categoria.hasMany(models.Producto, {
        foreignKey: 'categoriaId'
      });
    }

  }

  ;
  Categoria.init({
    nombre: DataTypes.STRING,
    detalle: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Categoria',
    paranoid: true
  });
  return Categoria;
};