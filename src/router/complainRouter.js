const express = require('express')
const router = express.Router()
const complainController = require('../controllers/complainController')

router.use('/show',complainController.getAllComplain)
router.use('/topic/create',complainController.createTopic)
router.use('/topic/show',complainController.getAllTopic)
router.use('/topic/solution/create',complainController.createSolutionForTopic)
router.use('/topic/solution/show',complainController.getSolutionForTopic)


module.exports = router
