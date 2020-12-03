const express = require('express')
const Fav = require('../models/fav')
const Post = require('../models/post')

module.exports = {
  getAllFavs: (req, res) => {
    Fav.find({}, (err, foundFav) => {
      return res.json(foundFav)
    })
  },
  getFavByPostId: (req, res) => {
    const postId = req.params.postId
    Fav.find({ postId }, (err, foundFav) => {
      if (err) {
        return res
          .status(422)
          .send({ errors: [{ title: 'Error', detail: 'Fav not found' }] })
      }
      return res.json(foundFav)
    })
  },
  getFavByUid: (req, res) => {
    const uid = req.params.uid
    Fav.find({ uid }, (err, foundFav) => {
      if (err) {
        return res
          .status(422)
          .send({ errors: [{ title: 'Error', detail: 'Fav not found' }] })
      }
      return res.json(foundFav)
    })
  },
  getPostByPostId: (req, res) => {
    const uid = req.params.uid
    Fav.find({ uid }, (err, foundFav) => {
      if (err) {
        return res
          .status(422)
          .send({ errors: [{ title: 'Error', detail: 'Fav not found' }] })
      }
      const postIdOfFavs = foundFav.map((fav) => {
        return { _id: fav.postId }
      })
      const query = {
        $or: postIdOfFavs,
      }
      Post.find(query, (err, foundFavsWithPostId) => {
        if (!query.length) {
          return res.json(foundFavsWithPostId)
        }
        if (err) {
          return res.status(422).send({
            errors: [{ title: 'user error', detail: 'エラーが発生しました' }],
          })
        }
        return res.json(foundFavsWithPostId)
      })
    })
  },
  post: (req, res) => {
    const { uid, postId } = req.body

    if (!uid) {
      return res
        .status(422)
        .send({ errors: [{ title: 'fav error', detail: 'Uidがありません' }] })
    }
    if (!postId) {
      return res.status(422).send({
        errors: [{ title: 'fav error', detail: 'PostIdがありません' }],
      })
    }
    const query = { $and: [{ uid }, { postId }] }
    Fav.find(query, (err, foundFav) => {
      if (err) {
        return res.status(422).send({
          errors: [{ title: 'user error', detail: 'エラーが発生しました' }],
        })
      }
      if (foundFav.length === 1) {
        return res.status(422).send({
          errors: [{ title: 'user error', detail: '既にfavが存在します' }],
        })
      }
      const fav = new Fav({ uid, postId })

      fav.save((err) => {
        if (err) {
          return res.status(422).send({
            errors: [{ title: 'fav error', detail: 'favができませんでした' }],
          })
        }
        return res.json({ registerd: true })
      })
    })
  },
  deleteById: (req, res) => {
    const favId = req.params.favId
    Fav.deleteOne({ _id: favId }).then((err) => {
      if (err) {
        console.error(err)
      }
      res.json({ delete: 'success' })
    })
  },
}
