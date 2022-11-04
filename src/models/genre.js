"use strict";
const { Model } = require("sequelize");
const film = require("./film");
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Film }) {
      Genre.hasMany(Film, {
        foreignKey: "id",
        timestamps: false,
      });
    }
  }
  Genre.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: { type: DataTypes.STRING },
      filmId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Genre",
    }
  );
  return Genre;
};
