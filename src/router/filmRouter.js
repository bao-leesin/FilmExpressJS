const express = require('express')
const router = express.Router()
const filmController = require('../controllers/filmController')
const { verifyToken } = require('../middleware/authentication')

    router.use('/create' ,filmController.createFilm)
    router.use('/show' ,filmController.showFilm)
    

module.exports = router