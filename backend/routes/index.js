const express = require('express')
const postRoutes = require('./post')
const favRoutes = require('./fav')
const userRoutes = require('./user')
const sampleRoutes = require('./sample')

const router = express.Router()

router.use('/post', postRoutes)
router.use('/fav', favRoutes)
router.use('/user', userRoutes)
router.use('/sample', sampleRoutes)

module.exports = router
