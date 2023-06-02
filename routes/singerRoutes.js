const express = require('express')
const router = express.Router()
const singerController = require('../controllers/singerController')

router.get('/', singerController.getAllSingers)
router.get('/:id', singerController.getSingerById)
router.post('/', singerController.createSinger)
router.put('/:id', singerController.updateSinger)
router.delete('/:id', singerController.deleteSinger)

module.exports = router
