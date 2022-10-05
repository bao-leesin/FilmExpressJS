'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Film_actor extends Model {
   
    static associate(models) {
    Film_actor.belongsTo(models.actor)
    Film_actor.belongsTo(models.film)
    models.actor.hasMany(Film_actor)
    models.film.hasMany(Film_actor)
    }
  }
  Film_actor.init({
    actorId: DataTypes.UUID,
    filmId: DataTypes.UUID
}, {
    sequelize,
    modelName: 'film_actor',
  });
  return Film_actor;
};