

function formatSelectedFilms(films) {
  return films.map(film => ({
      movieId: film.movieId,
      _id: film._id
  }))
}

function setSelect(films, likedFilms) {
  return films.map(film => {
      let isSelect = false
      let _id = null
      // likedFilms = [];

      likedFilms.forEach(selectedFilm => {
          isSelect = film.id === selectedFilm.movieId
          if (isSelect) _id = selectedFilm._id
      })

      return { ...film, _id }
  })
}

export { formatSelectedFilms, setSelect } 