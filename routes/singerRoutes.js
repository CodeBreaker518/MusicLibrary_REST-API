const express = require('express')
const router = express.Router()
const singerController = require('../controllers/singerController')

router.get('/', singerController.getAllSingers)
router.get('/:id', singerController.getSingerById)
router.post('/', singerController.createSinger)
router.put('/:id', singerController.updateSinger)
router.delete('/:id', singerController.deleteSinger)

router.get('/:singerId/albums', albumController.getAlbumsBySinger)
router.post('/:singerId/albums/:albumId', albumController.addAlbumToSinger)
router.delete('/:singerId/albums/:albumId', albumController.removeAlbumFromSinger)

module.exports = router
