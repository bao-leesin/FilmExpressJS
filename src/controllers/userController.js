// const User = require('./../models/user')
const user = require('../data/userData')

    
let getUser =  async (req,res) => {
    try {
        const data = await user.findUser()
        res.send(...data)
    } catch (error) {
        res.status(400).send(error.message)
    }
} 

let createUser = async (req,res) => {}

module.exports = 
{getUser,
createUser
}