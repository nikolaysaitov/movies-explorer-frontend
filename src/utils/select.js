

function formatSelectedFilms(films) {
  return films.map(film => ({
      movieId: film.movieId,
      _id: film._id
  }))
}

function setSelect(films, selectedFilms) {
  return films.map(film => {
      let isSelect = false
      let _id = null
      // selectedFilms = [];

      selectedFilms.forEach(selectedFilm => {
          isSelect = film.id === selectedFilm.movieId
          if (isSelect) _id = selectedFilm._id
      })

      return { ...film, _id }
  })
}

export { formatSelectedFilms, setSelect } 