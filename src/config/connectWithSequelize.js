const { Sequelize } = require('sequelize');

const database = process.env.DATABASE
const username = process.env.MYSQL_USER
const password = process.env.MYSQL_PASSWORD


const sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});



let checkConnectDB = async () => {
    try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }} 


module.exports = checkConnectDB