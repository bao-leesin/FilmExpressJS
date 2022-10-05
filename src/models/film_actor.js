'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Film_actor extends Model {
   
    static associate(models) {
    Film_actor.belongsTo(models.Actor)
    Film_actor.belongsTo(models.Film)
    models.Actor.hasMany(Film_actor)
    models.Film.hasMany(Film_actor)
    }
  }
  Film_actor.init({
    actorId: DataTypes.UUID,
    filmId: DataTypes.UUID
}, {
    sequelize,
    modelName: 'Film_actor',
  });
  return Film_actor;
};