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
      Watched.belongsTo(models.User)
      Watched.belongsTo(models.Film)
      models.User.hasMany(Watched)
      models.Film.hasMany(Watched)
    }
  }
  Watched.init({
    userId: DataTypes.UUID,
    filmId: DataTypes.UUID
}, {
    sequelize,
    modelName: 'Watched',
  });
  return Watched;
};