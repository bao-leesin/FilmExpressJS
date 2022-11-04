"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Rate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Film}) {
      Rate.belongsTo(User, { foreignKey: "userId" });
      Rate.belongsTo(Film, { foreignKey: "filmId" });
    }
  }
  Rate.init(
    {
      userId: DataTypes.UUID,
      rate: DataTypes.INTEGER,
      filmId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Rate",
    }
  );
  return Rate;
};
