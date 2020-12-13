const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema(
  {
    uid: { type: String },
    photoUrl: { type: String },
    text: { type: String },
    postId: { type: String },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('comment', CommentSchema)
