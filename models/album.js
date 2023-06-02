const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  label: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Album', albumSchema)
