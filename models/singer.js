const mongoose = require('mongoose')

const singerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
})

module.exports = mongoose.model('Singer', singerSchema)
