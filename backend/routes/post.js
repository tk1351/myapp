const express = require('express')
const router = express.Router()
const Post = require('../model/post')
// const Fav = require('../model/fav')

router.get('', (req, res) => {
  Post.find({}, function (err, foundPost) {
    return res.json(foundPost)
  })
})

router.get('/user/:uid', (req, res) => {
  const uid = req.params.uid
  Post.find({ uid }, function (err, foundPost) {
    if (err) {
      return res
        .status(422)
        .send({ errors: [{ title: 'Error', detail: 'Post not found' }] })
    }
    return res.json(foundPost)
  })
})

router.get('/:postId', (req, res) => {
  const postId = req.params.postId
  Post.findById(postId, function (err, foundPost) {
    if (err) {
      return res
        .status(422)
        .send({ errors: [{ title: 'Error', detail: 'Post not found' }] })
    }
    return res.json(foundPost)
  })
})

router.post('', (req, res) => {
  const ArticlePost = new Post()

  ArticlePost.uid = req.body.uid
  ArticlePost.categoryId = req.body.categoryId
  ArticlePost.title = req.body.title
  ArticlePost.text = req.body.text
  ArticlePost.url = req.body.url
  ArticlePost.fav = req.body.fav

  ArticlePost.save(function (err) {
    if (err) {
      res.send(err)
    } else {
      res.json({ articlePost: 'success' })
    }
  })
})

router.put('/:postId', (req, res) => {
  const postId = req.params.postId
  Post.findById(postId, function (err, foundPost) {
    if (err) {
      res.send(err)
    } else {
      foundPost.title = req.body.title
      foundPost.text = req.body.text
      foundPost.categoryId = req.body.categoryId
      foundPost.url = req.body.url
      foundPost.fav = req.body.fav

      foundPost.save(function (err) {
        if (err) {
          res.send(err)
        } else {
          res.json({ update: 'success' })
        }
      })
    }
  })
})

router.delete('/:postId', (req, res) => {
  const postId = req.params.postId
  Post.deleteOne({ _id: postId }).then(() => {
    res.json({ delete: 'success' })
  })
})

// router.delete('/fav/:postId', (req, res) => {
//   const postId = req.params.postId
//   Fav.deleteMany({ postId }).then(() => {
//     res.json({ delete: 'success' })
//   })
// })

module.exports = router
