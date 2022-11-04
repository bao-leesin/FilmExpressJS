const db = require("../models");

function readUser(username) {
  return new Promise((resolve, reject) => {
    try {
      const data = db.User.findOne({
        where: { name: username },
        raw: true,
      });
     
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

function readProfile(username) {
  return new Promise(async (resolve, reject) => {
    try {
      const userId = db.userId.find;
    } catch (error) {}
  });
}

function readAllFilm() {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Film.findAll({
        include:  [db.Genre,db.Actor],
        raw: true,
        nest: true
      });
    
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

function readOneFilm(filmName) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.Film.findOne({
        where: { name: filmName },
        raw: true,
      });
     
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  readUser,
  readAllFilm,
  readOneFilm,
  readProfile,
};
