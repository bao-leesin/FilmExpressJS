const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { verifyToken } = require('../middleware/authentication')

router.use('/show',userController.getAllUser)
router.use('/show/:id',userController.getUserInfo)
router.use('/update/:id',userController.updateUserInfo)
router.use('/subcribe', userController.subscribe)
    

module.exports = router