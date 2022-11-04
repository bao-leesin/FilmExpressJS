const { or } = require("sequelize");
const db = require("../models");

function checkUser(username, email) {
  return new Promise((resolve, reject) => {
    try {
      const data = db.User.findAll({
        where: or(
          { name: username },
          { email: email }
        ) ,
        raw: true,
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  checkUser,
};
