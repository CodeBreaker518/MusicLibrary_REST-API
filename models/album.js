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
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song',
    },
  ],
})

module.exports = mongoose.model('Album', albumSchema)
