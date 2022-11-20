const express = require('express')
const router = express.Router()
const filmController = require('../controllers/filmController')

router.get('/show/id/:idPhim', filmController.getFilmById)
router.use('/rating/show/:idPhim',filmController.showRatingFilm)
router.get('/search/name/:keyword',filmController.getFilmByName)
router.post('/filter/genres', filmController.getFilmByGenres)
router.use('/create', filmController.createFilm)
router.use('/update/:idPhim', filmController.createFilm)
router.use('/delete/:idPhim', filmController.createFilm)
router.get('/show',filmController.getAllFilm)



module.exports = router