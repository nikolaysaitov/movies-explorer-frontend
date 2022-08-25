// export let BASE_URL = "";
// const { NODE_ENV } = process.env;
// if (NODE_ENV === "production") {
//   BASE_URL = "https://api.kino.nomoredomains.sbs";
// } else {
//   BASE_URL = "http://localhost:3000";
// }

// function checkResponse(res) {
//   if (res.ok) {
//     return res.json();
//   }
//   return Promise.reject(res.status);
// }

// export const register = ({ name, email, password }) => {
//   return fetch(`${BASE_URL}/signup`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name: name,
//       email: email,
//       password: password,
//     }),
//   }).then(checkResponse);
// };

// export const authorize = ({ email, password }) => {
//   return fetch(`${BASE_URL}/signin`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email: email,
//       password: password,
//     }),
//   }).then(checkResponse);
// };

// export const editProfile = ({ name, email, token }) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//     },
//     body: JSON.stringify({
//       name,
//       email,
//     }),
//   }).then(checkResponse);
// };

// export const getProfile = (token) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   }).then(checkResponse);
// };

// export const checkToken = (jwt) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//     },
//   }).then(checkResponse);
// };
export default class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _fetch(path, method, body, token) {
    const url = this._baseUrl + path;
    return fetch(url, {
      method,
      headers: {
        ...this._headers,
        authorization: token ? `Bearer ${token}` : "",
      },
      body,
    }).then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  register(user) {
    const body = JSON.stringify(user);
    return this._fetch("/signup", "POST", body);
  }

  authorize(user) {
    const body = JSON.stringify(user);
    return this._fetch("/signin", "POST", body);
  }

  editProfile(user, token) {
    const body = JSON.stringify(user);
    return this._fetch("/users/me", "PATCH", body, token);
  }

  getProfile(token) {
    return this._fetch("/users/me", "GET", null, token);
  }

  fetchSelectFilms(token) {
    return this._fetch("/movies", "GET", null, token);
  }

  addSelectFilm(film, token) {
    const body = JSON.stringify(film);
    return this._fetch("/movies", "POST", body, token);
  }

  deleteSelectFilm(filmId, token) {
    return this._fetch(`/movies/${filmId}`, "DELETE", null, token);
  }

  checkToken(token) {
    return this._fetch("/users/me", "GET", null, token);
  }
}
