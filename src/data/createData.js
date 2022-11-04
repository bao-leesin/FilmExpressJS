const db = require("../models");
const reader = require("./readData");

function createUser(user) {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.create(user);

      const data = await db.User.findOne({
        where: {
          name: user.name,
        },
        raw: true,
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

function createProfile() {}

function createFilm(filmData) {
  const { filmName, genreName, actorName } = filmData;

  return new Promise(async (resolve, reject) => {
    try {
      await db.Film.create({
        name: filmName,
        // date: film.date,
      });
      const film = await reader.readOneFilm(filmName);
      const filmId = film.id;
      await db.Genre.create({
        name: genreName,
        filmId: filmId,
      });
      await db.Actor.create({
        name: actorName,
        filmId: filmId,
      });

      const data = await reader.readAllFilm();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  createUser,
  createFilm,
};
