'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Film}) {
      Profile.belongsTo(User,{foreignKey: 'userId'})
      Profile.belongsTo(Film,{foreignKey:'filmId'})
    }
  }
  Profile.init({
    userId: DataTypes.UUID,
    filmId: DataTypes.UUID,
    type: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};