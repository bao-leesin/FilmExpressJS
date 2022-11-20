const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { verifyToken } = require('../middleware/authentication')

router.use('/show',userController.getAllUser)
router.use('/id/show/:idNguoiDung',userController.getUserInfo)
router.use('/id/update/:idNguoiDung',userController.updateUserInfo)
router.use('/subcribe', userController.subscribe)
router.use('/rate', userController.rateFilm)
router.use('/request', userController.requestFilm)
router.use('/complain', userController.complain)
router.use('/like', userController.likeFilm)
router.use('/unlike', userController.unlikeFilm)
router.use('/likedfilm/show/:idNguoiDung', userController.getLikedFilm)
    

module.exports = router