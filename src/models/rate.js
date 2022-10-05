'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rate.belongsTo(models.user)
      Rate.belongsTo(models.film)
      models.user.hasMany(Rate)
      models.film.hasMany(Rate)
    }
  }
  Rate.init({
    rate: DataTypes.INTEGER,
    filmId: DataTypes.UUID,
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'rate',
  });
  return Rate;
};