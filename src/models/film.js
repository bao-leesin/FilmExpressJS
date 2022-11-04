"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Film extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Rate,Profile,Actor,Genre}) {
      Film.hasMany(Rate,{foreignKey: "filmId", onDelete: "CASCADE"})
      Film.hasMany(Profile,{foreignKey: "filmId", onDelete: "CASCADE"})

      // Tạo các tập thực thể kết hợp, through sẽ là tên bảng trong db
      Film.hasMany(Actor,{
        foreignKey: "filmId",
        timestamps: false,
      })

    
      Film.hasMany(Genre,{
        foreignKey: "filmId",
        timestamps: false,
      })
    }
  }
  Film.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      release: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Film",
    }
  );
  return Film;
};
