const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  length: {
    type: Number,
    required: true,
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
  },
})

module.exports = mongoose.model('Song', songSchema)
