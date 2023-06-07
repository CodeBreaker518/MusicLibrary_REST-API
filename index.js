const express = require('express')
const mongoose = require('mongoose')
const app = express()

// Middleware
app.use(express.json())

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/music-library', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection

db.once('open', () => {
  console.log('Connected to MongoDB')
})

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Routes
const singersRouter = require('./routes/singers')
const albumsRouter = require('./routes/albums')
const songsRouter = require('./routes/songs')

app.use('/singers', singersRouter)
app.use('/albums', albumsRouter)
app.use('/songs', songsRouter)

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
