const Actor  = require("../models/Actor");
const Film = require("../models/Film");
const Genre = require("../models/Genre");



const getAllFilm = async (req,res,next) => {
    let film = new Film()
    try {
        const films = await film.getAllFilm()
        const data = await Promise.all (films.map( async (film) => {
            let actor = new Actor()
            let genre = new Genre()
            let films= new Film()
            actor.setIdFilm = film.idPhim
            genre.setIdFilm =  film.idPhim
            films.setId = film.idPhim
            const actors =  await actor.getActorsByIdFilm()
            film.dienVien = actors
            const genres =  await genre.getGenresByIdFilm()
            film.theLoai = genres
            const images = await films.getFilmImages()
            film.duongDanAnh = images
            // console.log(film);
            return film
        }))
        res.send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getFilmById = async (req,res,next) => {
    let film = new Film()
    let actor = new Actor()
    let genre = new Genre()
    const params = req.params
    try {
    const idFilm = params.id
    film.setId = idFilm
    actor.setIdFilm = idFilm
    genre.setIdFilm = idFilm
    const films = await film.getFilmById()
    const actors = await actor.getActorsByIdFilm()
    const genres = await genre.getGenresByIdFilm()
    films.dienVien = actors
    films.theLoai = genres
    res.send(films)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getFilmByGenres = async (req,res,next) => {
    const object = req.body;
    const genres = object.genres;
    let film = new Film()
    film.setGenre = genres
    try {
    const films = await  film.getFilmByGenres()
    res.send(films)
    } catch (error) {
    res.status(400).send(error.message)
    }
}


const getFilmByName = async (req,res,next) => {
    const searchingWord = req.query.search    
    const film = new Film();
    film.setName = searchingWord
    try {
        const films = await film.getFilmByName()
        res.send(films)
    } catch (error) {
        next(error)
    }

}

const createFilm = async (req,res,next) => {
    const  {
        tenPhim,
        moTa,
        danhGia,
        trailer,
        luotXem,
        ngayChieu,
        dienVien,
        theLoai,
        duongDanAnh
    } = req.body
try {
    let film = new Film(tenPhim,moTa,danhGia,trailer,luotXem,ngayChieu)
    let actor = new Actor()
    let genre = new Genre()
    await film.createFilm()
    const idFilm = film.getId
    if(dienVien){
        dienVien.forEach(async (actor) => {
            let actors = new Actor()
            actors.setIdFilm = idFilm
            actors.setName = actor.tenDienVien
            await actors.getIdByName()
            await actors.createActorsInFilm()
        })
    }
    if(theLoai){
        theLoai.forEach( async(genre) => {
            let genres = new Genre()
            genres.setIdFilm = idFilm
            genres.setName = genre.theLoai
            await genres.createGenresInFilm()
        })
    }
    
    if(duongDanAnh){
        duongDanAnh.forEach( async(image) => {
            film.setImage = image.duongDanAnh
            film.createFilmImages()
        })
    }
   
    actor.setIdFilm = idFilm
    genre.setIdFilm = idFilm
    const films = await film.getFilmById()
    const actors = await actor.getActorsByIdFilm()
    const genres = await genre.getGenresByIdFilm()
    const images = await film.getFilmImages()
    films.dienVien = actors
    films.theLoai = genres
    films.duongDanAnh = images
    res.send(films)
} catch (error) {
    res.status(400).send(error.message)
} }

    const updateFilm = async (req,res,next) => {
        const{
            idPhim,
            tenPhim,
            moTa,
            danhGia,
            trailer,
            luotXem,
            ngayChieu,
            dienVien,
            theLoai
        } = req.body
    try {
        let film = new Film(tenPhim,moTa,danhGia,trailer,luotXem,ngayChieu)
        let actor = new Actor()
        let genre = new Genre()
        await film.createFilm()
        const idFilm = idPhim
        dienVien.forEach(async (actor) => {
            let actors = new Actor()
            actors.setIdFilm = idFilm
            actors.setName = actor.tenDienVien
            await actors.getIdByName()
            await actors.updateActorsInFilm()
        })
        theLoai.forEach( async(genre) => {
            let genres = new Genre()
            genres.setIdFilm = idFilm
            genres.setName = genre.theLoai
            await genres.updateGenresInFilm()
        })
        actor.setIdFilm = idFilm
        genre.setIdFilm = idFilm
        const films = await film.getFilmById()
        const actors = await actor.getActorsByIdFilm()
        const genres = await genre.getGenresByIdFilm()
        films.dienVien = actors
        films.theLoai = genres
        res.send(films)
    } catch (error) {
        res.status(400).send(error.message)
    }}

    const deleteFilm = async (req,res,next) => {
        const idFilm = req.params.id
        let film = new Film()
        let actor = new Actor()
        let genre = new Genre()
        film.setId = idFilm
        actor.setIdFilm = idFilm
        genre.setIdFilm = idFilm
        try {
            await film.deleteFilm()
            await actor.deleteActorsInFilm()
            await genre.deleteGenresInFilm()
            const films = await film.getAllFilm()
            res.send(films)
        } catch (error) {
            res.status(400).send(error.message)
        }
    }


   const createRatingFilm = async (req,res,next) => {
        const {idKhachHang,idPhim,soSaoDanhGia} = req.body
        try {
            let film = new Film()
            film.setIdUser = idKhachHang
            film.setId = idPhim
            film.setRating = soSaoDanhGia
            await film.rateFilm()
            const rating = await film.showRatingFilm()
            res.send({danhGia: rating})            
        } catch (error) {
            res.status(400).send(error.message)
        }
   }

   const showRatingFilm = async (req,res,next) => {
        const idFilm = req.params.id
        try {
            let film = new Film()
            film.setId = idFilm
            const rating = await film.showRatingFilm()
            res.send({danhGia: rating})
        } catch (error) {
            res.status(400).send(error.message)
        }
   }

   const createFilmImages = async (req,res,next) => {
        const idFilm = req.params.id
        const images = req.body.duongDanAnh
        try {
            let film = new Film()
            film.setId = idFilm
            images.forEach( async (image) => {
                film.setImage = image.duongDanAnh
                await film.createFilmImages()
            })
            const data = await film.getFilmById()
           res.send(data)
        } catch (error) {
            res.status(400).send(error.message)
        }
   }

   module.exports = {
    getAllFilm,
    getFilmByGenres,
    getFilmByName,
    getFilmById,
    createFilm,
    updateFilm,
    deleteFilm,
    createRatingFilm,
    showRatingFilm,
    createFilmImages
}
