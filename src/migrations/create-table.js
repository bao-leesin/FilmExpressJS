"use strict";

const { UUIDV4 } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
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
  await queryInterface.createTable("films", {
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
  await queryInterface.createTable("actors", {
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
  await queryInterface.createTable("genres", {
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
  await queryInterface.createTable("rates", {
    userId: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    filmId: {
      type: Sequelize.UUID
    },
    rates: {
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
  await queryInterface.createTable("favorites", {
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
  await queryInterface.createTable("watcheds", {
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
  await queryInterface.createTable("film_actors", {
    filmId: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    actorId:{
      type: Sequelize.UUID
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
  })  
  await queryInterface.createTable("film_genres", {
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
      table: 'users',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })  
  await queryInterface.addConstraint('rates', {
    type: 'FOREIGN KEY',
    name: 'fkey_rate_user',
    fields: ['userId'], 
    references: {
      table: 'users',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  await  queryInterface.addConstraint('rates', {
    type: 'FOREIGN KEY',
    name: 'fkey_rate_film',
    fields: ['filmId'], 
    references: {
      table: 'films',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  await  queryInterface.addConstraint('favorites', {
    type: 'FOREIGN KEY',
    name: 'fkey_favorite_user',
    fields: ['userId'], 
    references: {
      table: 'users',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  await  queryInterface.addConstraint('favorites', {
    type: 'FOREIGN KEY',
    name: 'fkey_favorite_film',
    fields: ['filmId'], 
    references: {
      table: 'films',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  await  queryInterface.addConstraint('watcheds', {
    type: 'FOREIGN KEY',
    name: 'fkey_watched_user',
    fields: ['userId'], 
    references: {
      table: 'users',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  await  queryInterface.addConstraint('watcheds', {
    type: 'FOREIGN KEY',
    name: 'fkey_watched_film',
    fields: ['filmId'], 
    references: {
      table: 'films',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  await  queryInterface.addConstraint('film_actors', {
    type: 'FOREIGN KEY',
    name: 'fkey_actor_film',
    fields: ['filmId'], 
    references: {
      table: 'films',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  await  queryInterface.addConstraint('film_actors', {
    type: 'FOREIGN KEY',
    name: 'fkey_film_actor',
    fields: ['actorId'], 
    references: {
      table: 'actors',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  await  queryInterface.addConstraint('film_genres', {
    type: 'FOREIGN KEY',
    name: 'fkey_genre_film',
    fields: ['filmId'], 
    references: {
      table: 'films',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  await  queryInterface.addConstraint('film_genres', {
    type: 'FOREIGN KEY',
    name: 'fkey_film_genre',
    fields: ['genreName'], 
    references: {
      table: 'genres',
      field: 'name',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  },
  async down(queryInterface, Sequelize) {
   return Promise.all
     ([queryInterface.dropTable("users"),
     queryInterface.dropTable("account"),
     queryInterface.dropTable("films"),
     queryInterface.dropTable("genres"),
     queryInterface.dropTable("actors"),
     queryInterface.dropTable("rates"),
     queryInterface.dropTable("favorites"),
     queryInterface.dropTable("watcheds"),
     queryInterface.dropTable("film_actors"),
     queryInterface.dropTable("film_genres"),
     queryInterface.dropTable("sequelizemeta")
    ])
  },
};
