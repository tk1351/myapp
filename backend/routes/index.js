const express = require('express')
const postRoutes = require('./post')
const favRoutes = require('./fav')

const router = express.Router()

router.use('/post', postRoutes)
router.use('/fav', favRoutes)

module.exports = router
