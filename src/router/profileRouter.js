const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')
const { verifyToken } = require('../middleware/authentication')

    router.use('/show/:username',verifyToken, profileController.showProfile)
    // router.use('/register', profileController.signUp)
    

module.exports = router