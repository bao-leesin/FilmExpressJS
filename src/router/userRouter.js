const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
// const { verifyToken } = require('../middleware/authentication')

router.use('/show/info/:idNguoiDung',userController.getUserInfo)
router.use('/show/liked/:idNguoiDung', userController.getLikedFilm)
router.use('/update/info',userController.updateUserInfo)
router.use('/subscribe', userController.subscribe)
router.use('/rate', userController.rateFilm)
router.use('/request', userController.requestFilm)
router.use('/complain', userController.complain)
router.use('/like', userController.likeFilm)
router.use('/unlike', userController.unlikeFilm)
router.use('/show',userController.getAllUser)


module.exports = router