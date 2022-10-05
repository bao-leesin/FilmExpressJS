'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Film_genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Film_genre.belongsTo(models.Actor)
      Film_genre.belongsTo(models.Film)
      models.Actor.hasMany(Film_genre)
      models.Film.hasMany(Film_genre)
    }
  }
  Film_genre.init({
    filmId: DataTypes.UUID,
    genreName: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Film_genre',
  });
  return Film_genre;
};