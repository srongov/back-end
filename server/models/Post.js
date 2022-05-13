const { model, Schema } = require('mongoose')

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String
})

module.exports = model('Post', postSchema)
