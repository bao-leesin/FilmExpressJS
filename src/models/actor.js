"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Film}) {
      Actor.hasMany(Film, {
        foreignKey: "id",
        timestamps: false
      })
    }
  }
  Actor.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      filmId: DataTypes.UUID
    },
    {
      sequelize,
      modelName: "Actor",
    }
  );
  return Actor;
};
