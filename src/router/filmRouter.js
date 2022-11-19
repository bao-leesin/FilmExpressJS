const express = require('express')
const router = express.Router()
const filmController = require('../controllers/filmController')

router.post('/filter/genres', filmController.getFilmByGenres)
router.get('/search/name',filmController.getFilmByName)
router.get('/show',filmController.getAllFilm)
router.get('/search/id/:id', filmController.getFilmById)
router.use('/create', filmController.createFilm)
router.use('/update/:id', filmController.createFilm)
router.use('/delete/:id', filmController.createFilm)
router.post('/rating/create', filmController.createRatingFilm)
router.use('/rating/search/:id',filmController.showRatingFilm)


module.exports = router