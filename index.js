const express = require('express')
const mongoose = require('mongoose')
const singerRoutes = require('./routes/singerRoutes')
const albumRoutes = require('./routes/albumRoutes')
const songRoutes = require('./routes/songRoutes')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const port = 3000

mongoose
  .connect('mongodb://localhost/music-library', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err)
  })

app.use(express.json())

app.use('/singers', singerRoutes)
app.use('/albums', albumRoutes)
app.use('/songs', songRoutes)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
