const Joi = require('joi')

module.exports = {
  validateSinger: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      nationality: Joi.string().required(),
      dateOfBirth: Joi.date().required(),
    })

    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    next()
  },

  validateAlbum: (req, res, next) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      label: Joi.string().required(),
      genre: Joi.string().required(),
      year: Joi.number().required(),
    })

    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    next()
  },

  validateSong: (req, res, next) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      length: Joi.number().required(),
    })

    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    next()
  },
}
