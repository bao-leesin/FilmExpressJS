"use strict";

const { UUIDV4 } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })  
    await queryInterface.createTable("account", {
      username: {
          type: Sequelize.STRING,
          primaryKey: true,
      },
      password: {
          type: Sequelize.STRING
      },
      email: {
          type: Sequelize.STRING
      },
      userId:{
          type: Sequelize.UUID
      },
      createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      },
      updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  })
  await queryInterface.createTable("film", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING,
    },
    release: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  })  
  await queryInterface.createTable("actor", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  })  
  await queryInterface.createTable("genre", {
    name: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  })  
  await queryInterface.createTable("rate", {
    userId: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    filmId: {
      type: Sequelize.UUID
    },
    rate: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  })  
  await queryInterface.createTable("favorite", {
    userId: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    filmId: {
      type: Sequelize.UUID,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  })  
  await queryInterface.createTable("watched", {
    userId: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    filmId: {
      type: Sequelize.UUID,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  })  
  await queryInterface.createTable("film_actor", {
    filmId: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    actorId:{
      type: Sequelize.UUID
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  })  
  await queryInterface.createTable("film_genre", {
    filmId: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    genreName:{
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  })
  // Tạo khoá ngoại
  await  queryInterface.addConstraint('account', {
    type: 'FOREIGN KEY',
    name: 'fkey_account_user',
    fields: ['userId'], 
    references: {
      table: 'user',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })  
  await queryInterface.addConstraint('rate', {
    type: 'FOREIGN KEY',
    name: 'fkey_rate_user',
    fields: ['userId'], 
    references: {
      table: 'user',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  await  queryInterface.addConstraint('rate', {
    type: 'FOREIGN KEY',
    name: 'fkey_rate_film',
    fields: ['filmId'], 
    references: {
      table: 'film',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  await  queryInterface.addConstraint('favorite', {
    type: 'FOREIGN KEY',
    name: 'fkey_favorite_user',
    fields: ['userId'], 
    references: {
      table: 'user',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  await  queryInterface.addConstraint('favorite', {
    type: 'FOREIGN KEY',
    name: 'fkey_favorite_film',
    fields: ['filmId'], 
    references: {
      table: 'film',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  await  queryInterface.addConstraint('watched', {
    type: 'FOREIGN KEY',
    name: 'fkey_watched_user',
    fields: ['userId'], 
    references: {
      table: 'user',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  await  queryInterface.addConstraint('watched', {
    type: 'FOREIGN KEY',
    name: 'fkey_watched_film',
    fields: ['filmId'], 
    references: {
      table: 'film',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  await  queryInterface.addConstraint('film_actor', {
    type: 'FOREIGN KEY',
    name: 'fkey_actor_film',
    fields: ['filmId'], 
    references: {
      table: 'film',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  await  queryInterface.addConstraint('film_actor', {
    type: 'FOREIGN KEY',
    name: 'fkey_film_actor',
    fields: ['actorId'], 
    references: {
      table: 'actor',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  await  queryInterface.addConstraint('film_genre', {
    type: 'FOREIGN KEY',
    name: 'fkey_genre_film',
    fields: ['filmId'], 
    references: {
      table: 'film',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  await  queryInterface.addConstraint('film_genre', {
    type: 'FOREIGN KEY',
    name: 'fkey_film_genre',
    fields: ['genreName'], 
    references: {
      table: 'genre',
      field: 'name',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  },
  async down(queryInterface, Sequelize) {
   return Promise.all
     ([queryInterface.dropTable("user"),
     queryInterface.dropTable("account"),
     queryInterface.dropTable("film"),
     queryInterface.dropTable("genre"),
     queryInterface.dropTable("actor"),
     queryInterface.dropTable("rate"),
     queryInterface.dropTable("favorite"),
     queryInterface.dropTable("watched"),
     queryInterface.dropTable("film_actor"),
     queryInterface.dropTable("film_genre"),
     queryInterface.dropTable("sequelizemeta")
    ])
  },
};
