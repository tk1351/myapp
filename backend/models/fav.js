const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FavSchema = new Schema(
  {
    uid: String,
    postId: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('fav', FavSchema)
