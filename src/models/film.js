'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Film extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    
    }
  }
  Film.init({
    id: DataTypes.UUID,
    name: DataTypes.STRING,
    release: DataTypes.Date,
    
  }, {
    sequelize,
    modelName: 'Film',
  });
  return Film;
};