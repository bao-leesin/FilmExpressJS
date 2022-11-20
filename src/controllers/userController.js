const User = require("../models/User");
const Complain = require("../models/Complain");
const Request = require("../models/Request");
const Film = require("../models/Film");



const getAllUser = async (req,res,next) => {
    try {
        let user = new User()
        const usersInfo = await user.getAllUserInfo()
        res.send(usersInfo)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getUserInfo = async (req,res,next) => {
    const idUser = req.params.idNguoiDung
    try {
        let user = new User()
        user.setId = idUser
        const userInfo = await user.getUserInfo()
        res.send(userInfo)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const subscribe = async (req,res,next) => {
    const  {idKhachHang,idGoi,ngayDangKiGoi,khuyenMaiSuDung} = req.body
    try {
        let user = new User()
        user.setId = idKhachHang
        user.setSubsciption = idGoi
        user.setSubsciptionDay = ngayDangKiGoi
        user.setPromotion = khuyenMaiSuDung
        const output =  await user.subscribe()
        if (!output) res.status(400).send({ketQua: "Thất bại"})
        else res.send({ketQua: "Thành công"})
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const requestFilm = async (req,res,next) => {
    const {idKhachHangYeuCau,phimYeuCau,trangThai} = req.body
    try {
        let request = new Request(null,idKhachHangYeuCau,phimYeuCau,trangThai)
        const output = await request.createRequest()
        if (!output) res.status(400).send({ketQua: "Thất bại"})
        else res.send({ketQua: "Thành công"})
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const complain = async (req,res,next) => {
    const {idNguoiDung,tieuDeKhieuNai,noiDungKhieuNai} = req.body
    try {
        let complain = new Complain()
        const output = await complain.createComplain(null,idNguoiDung,tieuDeKhieuNai,noiDungKhieuNai)
        if (!output) res.status(400).send({ketQua: "Thất bại"})
        else res.send({ketQua: "Thành công"})
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const rateFilm = async (req,res,next) => {
    const {idKhachHang,idPhim,soSaoDanhGia} = req.body
    try {
        let film = new Film()
        film.setIdUser = idKhachHang
        film.setId = idPhim
        film.setRating = soSaoDanhGia
        await film.rateFilm()
        await film.updateRatingFilm()
        const rating = await film.showRatingFilm()
        res.send({danhGia: rating})            
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const updateUserInfo = async (req,res,next) => {
    const {idNguoiDung,vaiTro,diaChi,sinhNhat,email,tenDayDu,gioiTinh} = req.body
    try {
        let user = new User(idNguoiDung,null,null,vaiTro,diaChi,sinhNhat,email,tenDayDu,gioiTinh);
        await user.updateUserInfo()
        const data = await user.getUserInfo()
        res.send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
}


const likeFilm = async (req,res,next) => {
        const {idNguoiDung,idPhim} = req.body
        try {
            let user = new User()
            user.setIdFilm = idPhim
            user.setId = idNguoiDung
            await user.likeFilm()
            const likedFilms = await user.getLikedFilm()
            if (!likedFilms.length) res.send('')
            else res.send(likedFilms)
            
        } catch (error) {
            res.status(400).send(error.message)            
        }

}

const unlikeFilm = async (req,res,next) => {
        const {idNguoiDung,idPhim} = req.body
        try {
           let user = new User()
           user.setIdFilm = idPhim
           user.setId = idNguoiDung
           await user.unlikeFilm()
           const likedFilms = await user.getLikedFilm()
            if (!likedFilms.length) res.send('')
            else res.send(likedFilms)
            
        } catch (error) {
            res.status(400).send(error.message)            
        }
}
const getLikedFilm = async (req,res,next) => {
        const idNguoiDung = req.params.idNguoiDung
        try {
            let user = new User()
            user.setId = idNguoiDung
            const output = await user.getLikedFilm()
            console.log(output);
            if(!output.length) res.send('')
            else res.send(output)
        } catch (error) {
            res.status(400).send(error.message)        
        }
}


module.exports = {
    getUserInfo,
    updateUserInfo,
    getAllUser,
    subscribe,
    complain,
    rateFilm,
    requestFilm,
    likeFilm,
    unlikeFilm,
    getLikedFilm
    
}