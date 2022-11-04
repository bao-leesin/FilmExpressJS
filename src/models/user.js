'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Rate,Profile}) {
     User.hasMany(Rate,{foreignKey: "userId", onDelete: "CASCADE"})
     User.hasMany(Profile,{foreignKey: "userId", onDelete: "CASCADE"})
    }
  }
  User.init({
    id:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: { 
      type: DataTypes.STRING,
      unique: true
    },
    email: { 
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

 
  return User;
};