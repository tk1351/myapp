const User = require('../models/user')

module.exports = {
  getAllUsers: (req, res) => {
    User.find({}, (err, foundUser) => {
      if (err) {
        return res
          .status(422)
          .send({ errors: [{ title: 'Error', detail: 'User not found' }] })
      }
      return res.status(200).json(foundUser)
    })
  },
  getUserById: (req, res) => {
    const uid = req.params.uid
    User.find({ uid }, (err, foundUser) => {
      if (err) {
        return res
          .status(422)
          .send({ errors: [{ title: 'Error', detail: 'User not found' }] })
      }
      return res.json(foundUser)
    })
  },
  addUser: (req, res) => {
    const { uid, username, photoUrl } = req.body
    if (!uid) {
      return res
        .status(422)
        .send({ errors: [{ title: 'user error', detail: 'uidがありません' }] })
    }
    if (!username) {
      return res.status(422).send({
        errors: [{ title: 'user error', detail: 'usernameがありません' }],
      })
    }
    User.findOne({ uid }, (err, foundUser) => {
      if (err) {
        return res.status(422).send({
          errors: [{ title: 'user error', detail: 'エラーが発生しました' }],
        })
      }
      if (foundUser) {
        return res.status(422).send({
          errors: [{ title: 'user error', detail: '既にユーザーが存在します' }],
        })
      }
      const user = new User({ uid, username, photoUrl })
      user.save((err) => {
        if (err) {
          res.send(err)
        } else {
          res.json({ addUser: 'success' })
        }
      })
    })
  },
}
