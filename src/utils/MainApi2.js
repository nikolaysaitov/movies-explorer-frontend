export default class MainApii {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
    }
  
    _fetch(path, method, body, token) {
        const url = this._baseUrl + path
        return fetch(url, {
            method,
            headers: {
                ...this._headers,
                authorization: token ? `Bearer ${token}` : ''
            },
            body
        })
            .then(res => {
                return res.ok
                    ? res.json()
                    : Promise.reject(`Ошибка: ${res.status}`)
            })
    }
  
    fetchSelectFilms(token) {
        return this._fetch('/movies', 'GET', null, token)
    }
  
    addSelectFilm(film, token) {
        const body = JSON.stringify(film)
        return this._fetch('/movies', 'POST', body, token)
    }
  
    deleteSelectFilm(filmId, token) {
        return this._fetch(`/movies/${filmId}`, 'DELETE', null, token)
    }
  }