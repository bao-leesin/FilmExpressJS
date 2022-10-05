'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Watched extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Watched.belongsTo(models.user)
      Watched.belongsTo(models.film)
      models.user.hasMany(Watched)
      models.film.hasMany(Watched)
    }
  }
  Watched.init({
    userId: DataTypes.UUID,
    filmId: DataTypes.UUID
}, {
    sequelize,
    modelName: 'ratched',
  });
  return Watched;
};