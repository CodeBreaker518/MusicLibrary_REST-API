const express = require('express')
const router = express.Router()
const Singer = require('../models/singer')
const Album = require('../models/album')
const JoiValidations = require('../middleware/joiValidations')

// Get all singers
router.get('/', async (req, res) => {
  try {
    const singers = await Singer.find()
    singers.length < 1 ? res.status(404).json({ message: 'There are no singers created' }) : res.json(singers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get a single singer
router.get('/:id', async (req, res) => {
  try {
    const singer = await Singer.findById(req.params.id)
    if (singer) {
      res.json(singer)
    } else {
      res.status(404).json({ message: 'Cantante no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create a new singer
router.post('/', JoiValidations.validateSinger, async (req, res) => {
  const singer = new Singer({
    name: req.body.name,
    nationality: req.body.nationality,
    dateOfBirth: req.body.dateOfBirth,
  })

  try {
    const newSinger = await singer.save()
    res.status(201).json(newSinger)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update a singer
router.put('/:id', JoiValidations.validateSinger, async (req, res) => {
  try {
    const singer = await Singer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        nationality: req.body.nationality,
        dateOfBirth: req.body.dateOfBirth,
      },
      { new: true }
    )
    if (singer) {
      res.json(singer)
    } else {
      res.status(404).json({ message: 'Singer not found' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete a singer
router.delete('/:id', async (req, res) => {
  try {
    const singer = await Singer.findByIdAndRemove(req.params.id)
    if (singer) {
      res.json({ message: 'Cantante eliminado' })
    } else {
      res.status(404).json({ message: 'Cantante no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET: Obtiene todos los álbumes de un cantante o solo uno
router.get('/:singerId/albums/:albumId?', async (req, res) => {
  try {
    const { singerId, albumId } = req.params
    const singer = await Singer.findById(singerId).populate('albums')

    if (!singer) {
      return res.status(404).json({ message: 'Cantante no encontrado.' })
    }

    if (albumId) {
      const album = singer.albums.find((a) => a._id.equals(albumId))
      if (!album) {
        return res.status(404).json({ message: 'Álbum no encontrado para el cantante especificado.' })
      }
      return res.json(album)
    }
    singer.albums.length < 1 ? res.json({ message: 'El cantante no tiene ningun album' }) : res.json(singer.albums)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al obtener los álbumes del cantante.')
  }
})

// POST: Agrega un nuevo álbum al cantante
router.post('/:singerId/albums/:albumId', async (req, res) => {
  try {
    const { singerId, albumId } = req.params

    const singer = await Singer.findById(singerId)

    if (!singer) {
      return res.status(404).json({ message: 'Cantante no encontrado.' })
    }

    const isAlbumRegistered = singer.albums.some((a) => a._id.equals(albumId))
    if (isAlbumRegistered) {
      return res.status(400).json({ message: 'El álbum ya está registrado en el cantante.' })
    }

    const album = await Album.findById(albumId)
    if (!album) {
      return res.status(404).json({ message: 'Álbum no encontrado.' })
    }

    singer.albums.push(album.id)
    await singer.save()

    res.json(singer)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al agregar el álbum al cantante.')
  }
})

// DELETE: Elimina un álbum del cantante
router.delete('/:singerId/albums/:albumId', async (req, res) => {
  try {
    const { singerId, albumId } = req.params

    const singer = await Singer.findById(singerId)
    if (!singer) {
      return res.status(404).json({ message: 'Cantante no encontrado.' })
    }

    const albumIndex = singer.albums.findIndex((a) => a._id.equals(albumId))
    if (albumIndex === -1) {
      return res.status(404).json({ message: 'Álbum no encontrado para el cantante especificado.' })
    }

    singer.albums.splice(albumIndex, 1)
    await singer.save()

    res.json({ message: 'Album eliminado', singer })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al eliminar el álbum del cantante.')
  }
})

module.exports = router
