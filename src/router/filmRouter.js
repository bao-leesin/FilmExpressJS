const express = require('express')
const router = express.Router()
const filmController = require('../controllers/filmController')

router.get('/show',filmController.getAllFilm)
router.get('/id/show/:idPhim', filmController.getFilmById)
router.use('/rating/show/:idPhim',filmController.showRatingFilm)
router.get('/name/search/:keyword',filmController.getFilmByName)
router.post('/filter/genres', filmController.getFilmByGenres)
router.use('/create', filmController.createFilm)
router.use('/update/:idPhim', filmController.createFilm)
router.use('/delete/:idPhim', filmController.createFilm)



module.exports = router