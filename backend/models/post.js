const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    uid: { type: String },
    categoryId: { type: String },
    title: { type: String, max: [30] },
    text: { type: String },
    image: { type: String },
    url: { type: String },
    fav: { type: Number },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('post', PostSchema)
