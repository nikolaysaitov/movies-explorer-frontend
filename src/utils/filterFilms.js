export const filterFilms = (films, shortDuration, { film: searchQuery, short: isShort }) => {
    return films.filter(film => {
        const isShortFilm = film.duration <= shortDuration
        const filmName = film.nameRU.toLowerCase()
        const search = searchQuery.toLowerCase()

        return isShort
            ? filmName.includes(search) && isShortFilm
            : filmName.includes(search)
    })
}