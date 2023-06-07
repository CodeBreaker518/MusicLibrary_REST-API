const express = require('express')
const router = express.Router()
const Song = require('../models/song')
const JoiValidations = require('../middleware/joiValidations')

// GET all songs
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find()
    songs.length < 1 ? res.status(404).json({ messages: 'No hay canciones creadas' }) : res.json(songs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// READ a single song
router.get('/:songId', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id)
    if (!song) {
      return res.status(404).json({ message: 'Cancion no encontrada' })
    }
    res.json(song)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// CREATE a new song
router.post('/', JoiValidations.validateSong, async (req, res) => {
  const song = new Song({
    title: req.body.title,
    length: req.body.length,
  })

  try {
    const newSong = await song.save()
    res.status(201).json(newSong)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// UPDATE a song
router.put('/:id', JoiValidations.validateSong, async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        length: req.body.length,
      },
      { new: true }
    )
    if (song) {
      res.json(song)
    } else {
      res.status(404).json({ message: 'Cancion no encontrada' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE a song
router.delete('/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndRemove(req.params.id)
    if (song) {
      res.json({ message: 'Cancion eliminada' })
    } else {
      res.status(404).json({ message: 'Cancion no encontrada' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
