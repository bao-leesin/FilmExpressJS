'use strict';
const {v4: uuidV4} = require('uuid')
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    
    }
  }
  User.init({
    id: {
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });

 
  return User;
};