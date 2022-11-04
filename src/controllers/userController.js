const reader = require('../data/readData')
const creator = require('../data/createData')
const checker = require('../data/checkData')

const {
  ValidationError,
  FieldRequiredError,
  AlreadyTakenError,
  NotFoundError,
} = require("../helper/customError");

const { jwtSign } = require('../helper/jwt')
const { bcryptHash, bcryptCompare } = require("../helper/bcrypt");

const signIn = async (req, res, next) => {
    try {
      // const account = req.body
      // const data = await reader.readUser(account)
      // const accessToken = await jwtSign(data)
      // res.send(accessToken)

      const user  = req.body;
     
      const existentUser = await reader.readUser(user.username);
      if (!existentUser) throw new NotFoundError("sign in first");

      const pwd = await bcryptCompare(user.password, existentUser.password);

      if (!pwd) throw new ValidationError("Wrong password ");
  
      const token = await jwtSign(user)
      console.log(token);

      res.send(token)
    } catch (error) {
      next(error)
    }
  };
  

const signUp = async (req, res, next) => {
    try {
      const { username, password ,email } = req.body;
      const user =  { name:username, password: await bcryptHash(password) ,email }
      if (!username) throw new FieldRequiredError(`A username`);
      if (!email) throw new FieldRequiredError(`An email`);
      if (!password) throw new FieldRequiredError(`A password`);

      const userExists = await checker.checkUser(username,email)
      if (userExists.length !== 0) throw new AlreadyTakenError("try logging in");
     
      const newUser = await creator.createUser(user)

      const token = await jwtSign(newUser);
  
      res.send(token)
    } catch (error) {
      next(error);
    }
  };

  module.exports = { signUp, signIn };