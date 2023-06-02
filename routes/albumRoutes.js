const express = require('express')
const router = express.Router()
const albumController = require('../controllers/albumController')

router.get('/', albumController.getAllAlbums)
router.get('/:id', albumController.getAlbumById)
router.post('/', albumController.createAlbum)
router.put('/:id', albumController.updateAlbum)
router.delete('/:id', albumController.deleteAlbum)

router.get('/:singerId/albums', albumController.getAlbumsBySinger)
router.post('/:singerId/albums/:albumId', albumController.addAlbumToSinger)
router.delete('/:singerId/albums/:albumId', albumController.removeAlbumFromSinger)

module.exports = router
