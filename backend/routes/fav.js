const express = require('express')
const router = express.Router()
const favController = require('../controllers/fav')

router.get('', favController.getAllFavs)
router.get('/post/:postId', favController.getFavByPostId)
router.get('/user/:uid', favController.getFavByUid)
router.get('/post/user/:uid', favController.getPostByPostId)
router.post('', favController.post)
router.delete('/:favid', favController.deleteById)

module.exports = router
