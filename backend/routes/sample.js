const express = require('express')
const router = express.Router()
const sampleController = require('../controllers/sample')

router.get('', sampleController.hello)

module.exports = router
