'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     
    static associate(models) {
      Favourite.belongsTo(models.User)
      Favourite.belongsTo(models.Film)
      models.User.hasMany(Favourite)
      models.Film.hasMany(Favourite)
    }
  }
  Favourite.init({
    userId: DataTypes.UUID,
    filmId: DataTypes.UUID
}, {
    sequelize,
    modelName: 'Favourite',
  });
  return Favourite;
};