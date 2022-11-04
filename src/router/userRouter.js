const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

    router.use('/login', userController.signIn)
    router.use('/register', userController.signUp)
    

module.exports = router