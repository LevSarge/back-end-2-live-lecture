const db = require('../db.json')
let globalID = 11

module.exports = {
  getMovies: (req, res) => {
    res.status(200).send(db)
  },
  createMovie: (req, res) => {
    console.log(req.body)
    const { title, rating, imageURL } = req.body

    if (!title || !rating || !imageURL) {
      return res.status(400).send('You forgot one of the required properties.')
    }

    const ratingNumber = +rating

    if (isNaN(ratingNumber)) {
      return res.status(400).send('Invalid rating.')
    }

    const newMovie = {
      id: globalID,
      title,
      rating: ratingNumber,
      imageURL,
    }

    globalID++

    db.push(newMovie)

    res.status(201).send(db)
  },
  deleteMovie: (req, res) => {
    const movieID = +req.params.id

    for (let i = 0; i < db.length; i++) {
      if (db[i].id === movieID) {
        db.splice(i, 1)
      }
    }

    // const filteredMovies = db.filter((movie) => {
    //   return movieID !== movie.id
    // })

    // db = filteredMovies

    // res.status(200).send(filteredMovies)

    res.status(200).send(db)
  },
  updateMovie: (req, res) => {
    const movieID = +req.params.id
    const { type, title } = req.body

    for (let i = 0; i < db.length; i++) {
      if (db[i].id === movieID) {
        let rating = db[i].rating // copies value

        if (type === 'plus') {
          if (rating === 5) {
            return res.status(400).send('Cannot increment beyond 5.')
          }

          rating++
        } else {
          if (rating === 1) {
            return res.status(400).send('Cannot decrement beyond 1.')
          }

          rating--
        }

        db[i] = { ...db[i], rating: rating, title: title ?? db[i].title }
      }
    }

    res.status(200).send(db)
  },
}
