const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('', userController.getAllUsers)
router.get('/:uid', userController.getUserById)
router.post('', userController.addUser)
router.put('/:uid', userController.putByUid)

module.exports = router
