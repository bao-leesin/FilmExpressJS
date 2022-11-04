"use strict";
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
          unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
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
      allowNull: true,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
  })  
  await queryInterface.createTable("actors", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    filmId: {
      type: Sequelize.UUID
    },
    name: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
  })  
  await queryInterface.createTable("genres", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    filmId: {
      type: Sequelize.UUID
    },
    name: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
  })  
  await queryInterface.createTable("rates", {
    userId: {
      type: Sequelize.UUID,
    },
    filmId: {
      type: Sequelize.UUID
    },
    rates: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
  })  
  await queryInterface.createTable("profiles", {
    userId: {
      type: Sequelize.UUID,
    },
    filmId: {
      type: Sequelize.UUID,
    },
    type: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
  })  
  
  
  // Tạo khoá ngoại
  
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
  await  queryInterface.addConstraint('profiles', {
    type: 'FOREIGN KEY',
    name: 'fkey_profile_user',
    fields: ['userId'], 
    references: {
      table: 'users',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  await  queryInterface.addConstraint('profiles', {
    type: 'FOREIGN KEY',
    name: 'fkey_profile_film',
    fields: ['filmId'], 
    references: {
      table: 'films',
      field: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  
  await  queryInterface.addConstraint('actors', {
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
  
  await  queryInterface.addConstraint('genres', {
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
 
  },
  async down(queryInterface, Sequelize) {
   return Promise.all
     ([queryInterface.dropTable("users"),
     queryInterface.dropTable("films"),
     queryInterface.dropTable("genres"),
     queryInterface.dropTable("actors"),
     queryInterface.dropTable("rates"),
     queryInterface.dropTable("favorites"),
     queryInterface.dropTable("sequelizemeta")
    ])
  },
};
