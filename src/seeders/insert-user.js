'use strict';
const {v4: uuidV4} = require('uuid')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('user', [{
        id: uuidV4(),
        name: 'John',
        avatar: 'example@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('user', [{
        id: uuidV4(),
        name: 'John',
        avatar: 'example@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user', null, {});
  }
};
