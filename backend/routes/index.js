const express = require('express')
const postRoutes = require('./post')
const favRoutes = require('./fav')
const userRoutes = require('./user')

const router = express.Router()

router.use('/post', postRoutes)
router.use('/fav', favRoutes)
router.use('/user', userRoutes)

module.exports = router
