const express = require('express')
const router = express.Router()
const filmController = require('../controllers/filmController')

router.get('/show/id/:idPhim', filmController.getFilmById)
router.use('/show/rating/:idPhim',filmController.showRatingFilm)
router.get('/search/name/:keyword',filmController.getFilmByName)
router.post('/filter/genres', filmController.getFilmByGenres)
router.use('/create', filmController.createFilm)
router.use('/update/', filmController.updateFilm)
router.use('/delete/:idPhim', filmController.deleteFilm)
router.get('/show',filmController.getAllFilm)



module.exports = router