'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     
    static associate(models) {
      Favorite.belongsTo(models.user)
      Favorite.belongsTo(models.film)
      models.user.hasMany(Favorite)
      models.film.hasMany(Favorite)
    }
  }
  Favorite.init({
    userId: DataTypes.UUID,
    filmId: DataTypes.UUID
}, {
    sequelize,
    modelName: 'favourite',
  });
  return Favorite;
};