const express = require('express')
const cors = require('cors')
const movieCtrl = require('./controllers/movieController')
const PORT = 4004

const app = express()

app.use(cors())
app.use(express.json()) // This allows us to parse JSON into a javascript object that we will access at req.body.

app.get('/api/movies', movieCtrl.getMovies)
app.post('/api/movies', movieCtrl.createMovie)
app.delete('/api/movies/:id', movieCtrl.deleteMovie)
app.put('/api/movies/:id', movieCtrl.updateMovie)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
