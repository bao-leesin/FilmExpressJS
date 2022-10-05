// const User = require('./../models/user')
const user = require('../data/userData')

let getUser =  async (req,res) => {
    const data = await user.findUser()
    console.log(data);
} 

module.exports = {getUser}