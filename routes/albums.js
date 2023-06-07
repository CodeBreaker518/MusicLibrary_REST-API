const express = require('express')
const router = express.Router()
const Album = require('../models/album')
const Song = require('../models/song')
const JoiValidations = require('../middleware/joiValidations')
const mongoose = require('mongoose')

// ----------------------- ALBUM ----------------------

// GET: Read all albums
router.get('/', async (req, res) => {
  try {
    const albums = await Album.find()
    albums.length < 1 ? res.status(404).json({ message: 'No hay albums creados' }) : res.json(albums)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET: Read a single album
router.get('/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id)
    if (!album) {
      res.status(404).json({ message: 'Album no encontrado' })
    } else {
      res.json(album)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST: Create a new album
router.post('/', JoiValidations.validateAlbum, async (req, res) => {
  const { title, label, genre, year } = req.body
  const album = new Album({
    title,
    label,
    genre,
    year,
  })

  try {
    const newAlbum = await album.save()
    res.status(201).json(newAlbum)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// UPDATE: Update an album
router.put('/:id', JoiValidations.validateAlbum, async (req, res) => {
  try {
    const album = await Album.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        label: req.body.label,
        genre: req.body.genre,
        year: req.body.year,
      },
      { new: true } // to return the new object (album) after the modification
    )
    if (album) {
      res.json(album)
    } else {
      res.status(404).json({ message: 'Album no encontrado' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE: Delete an album
router.delete('/:id', async (req, res) => {
  try {
    const album = await Album.findByIdAndRemove(req.params.id)
    if (album) {
      res.json({ message: 'Album eliminado' })
    } else {
      res.status(404).json({ message: 'Album no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ----------------------- SONG IN ALBUM ----------------------

// GET: Read all songs from an album, or return only one song from an album
router.get('/:albumId/songs/:songId?', async (req, res) => {
  try {
    const { albumId, songId } = req.params
    const album = await Album.findById(albumId).populate('songs')

    if (!album) {
      return res.status(404).json({ message: 'Álbum no encontrado.' })
    }

    if (songId) {
      const song = album.songs.find((s) => s._id.equals(songId))
      if (!song) {
        return res.status(404).json({ message: 'Canción no encontrada para el álbum especificado.' })
      }
      return res.json(song)
    }
    album.songs.length < 1
      ? res.status(404).json({ message: 'Este album no cuenta con canciones' })
      : res.json(album.songs)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al obtener las canciones del álbum.')
  }
})

// POST: Create a new song to an album
router.post('/:albumId/songs/:songId', async (req, res) => {
  try {
    const { albumId, songId } = req.params

    const album = await Album.findById(albumId)

    if (!album) {
      return res.status(404).json({ message: 'Álbum no encontrado.' })
    }

    const isSongRegistered = album.songs.some((s) => s._id.equals(songId))
    if (isSongRegistered) {
      return res.status(400).json({ message: 'La canción ya está registrada en el álbum.' })
    }

    const song = await Song.findById(songId)
    if (!song) {
      return res.status(404).json({ message: 'Canción no encontrada.' })
    }

    album.songs.push(song.id)
    await album.save()

    res.json(album)
  } catch (error) {
    console.log(error)
    res.status(500).send('Error al agregar la canción al álbum.')
  }
})

// DELETE: Delete a song from an album
router.delete('/:albumId/songs/:songId', async (req, res) => {
  try {
    const { albumId, songId } = req.params

    const album = await Album.findById(albumId)
    if (!album) {
      return res.status(404).json({ message: 'Álbum no encontrado.' })
    }

    const songIndex = album.songs.findIndex((s) => s._id.equals(songId))
    if (songIndex === -1) {
      return res.status(404).json({ message: 'Canción no encontrada para el álbum especificado.' })
    }

    album.songs.splice(songIndex, 1)
    await album.save()

    res.json(album)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al eliminar la canción del álbum.')
  }
})

module.exports = router
