import React, { useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import "./App.css";
import HeaderLogin from "../../components/HeaderLogin/HeaderLogin";
import Main from "../../components/Main/Main";
import Footer from "../../components/Footer/Footer";
import Movies from "../../components/Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound404 from "../NotFound404/NotFound404";
import Menu from "../Menu/Menu";
import MainApi from "../../utils/MainApi";
import { useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import { optionsMainApi, optionsMoviesApi } from "../../utils/MoviesApi";
import MoviesApi from "../../utils/MoviesApi";
import LocalStorage from "../../utils/LocalStorage";
import { DANGER_MESSAGES } from "../../utils/constans";

function App() {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [isReg, setIsReg] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const mainApi = new MainApi(optionsMainApi);
  const moviesApi = new MoviesApi(optionsMoviesApi);
  const jwtLocal = new LocalStorage("jwt");
  const filmsLocal = new LocalStorage("films");
  const searchQueryMoviesLocal = new LocalStorage("search-query-movies", {
    film: "",
    short: false,
  });
  const searchQuerySavedMoviesLocal = new LocalStorage(
    "search-query-saved-movies",
    { film: "", short: false }
  );
  const [isPreloader, setIsPreloader] = useState(true);
  const [messageAlarm, setMessageAlarm] = useState(null);
  const [isActiveAlarm, setIsActiveAlarm] = useState(false);

  //ЗАПРОС ВСЕХ ФИЛЬМОВ
  function getAllFilms() {
    return moviesApi.getFilms();
  }
  //ЗАПРОС ПОНРАВИВШИХСЯ ФИЛЬМОВ
  function likeSelectFilms() {
    const token = localStorage.getItem("jwt");
    return mainApi.fetchSelectFilms(token);
  }
  //КНОПКА ЛАЙК ФИЛЬМА(ДОБАВЛЯЕТ ЕСЛИ НЕТ И УДАЛЯЕТ ЕСЛИ ЕСТЬ)
  function handleLikeSelectButton(filmId, film) {
    const token = localStorage.getItem("jwt");
    return filmId
      ? mainApi.deleteSelectFilm(filmId, token).catch(() => {
          showDanger(DANGER_MESSAGES.ERROR.DELETE_FILM);
          throw new Error();
        })
      : mainApi.addSelectFilm(film, token).catch(() => {
          showDanger(DANGER_MESSAGES.ERROR.ADD_FILM);
          throw new Error();
        });
  }

  function showDanger(message) {
    setMessageAlarm(message);
    setIsActiveAlarm(true);
    setTimeout(() => {
      setIsActiveAlarm(false);
    }, 3000);
  }

  //МЕНЮ
  useEffect(() => {
    setIsShowMenu(false);
  }, [location]);

  //ОЧИСТКА
  function clearLocal() {
    jwtLocal.delete();
    searchQueryMoviesLocal.delete();
    searchQuerySavedMoviesLocal.delete();
  }

  // КНОПКА ВЫХОДА
  function handleExit() {
    setIsLoggedIn(false);
    clearLocal();
    history.push("/signin");
  }

  function handleLogin() {
    setIsLoggedIn(true);
  }

  //ВХОД НА СТРАНИЦЕ ЛОГИН
  function handleLoginSubmit(email, password, token) {
    mainApi
      .authorize(email, password, token)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setEmail(email);
        handleTokenCheck();
        setIsReg(true);
        handleLogin();
        history.push("/movies");
      })
      .catch((err) => {
        // setInfoPopupOpen(true);
        console.log(`Ошибка входа ${err}`);
        setIsReg(false);
      });
  }

  //РЕГИСТРАЦИЯ
  function handleRegisterSubmit({ name, email, password }) {
    mainApi
      .register({ name, email, password })
      .then((res) => {
        if (res) {
          setIsReg(true);
          history.push("/signin");
        } else {
          setIsReg(false);
          console.log("else");
        }
      })
      .catch((err) => {
        console.log(`Ошибка входа ${err}`);
        setIsReg(false);
      });
  }

  useEffect(() => {
    handleTokenCheck();
    if (isLoggedIn) {
      const token = localStorage.getItem("jwt");
      mainApi
        .getProfile(token)
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => console.log(`Ошибка ${err}`));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    mainApi
      .getProfile(token)
      .then((res) => setCurrentUser(res))
      .catch((err) => console.log(err));
  }, []);

  //ОБНОВЛЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  const handleUpdateUser = (name, email) => {
    const token = localStorage.getItem("jwt");
    mainApi
      .editProfile(name, email, token)
      .then((item) => {
        setCurrentUser(item);
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  };
  //ПРОВЕРКА ТОКЕНА ПОЛЬЗОВАТЕЛЯ
  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then((res) => {
          handleLogin();
          history.push("/movies");
          setEmail(res.email);
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <>
      <CurrentUserContext.Provider value={{ isLoggedIn, currentUser }}>
        <React.Fragment>
          <Switch>
            <Route path="/" exact>
              <HeaderLogin 
              setIsShowMenu={setIsShowMenu}/>
            </Route>

            <Route path="/movies">
              <HeaderLogin
                isLoggedIn={isLoggedIn}
                setIsShowMenu={setIsShowMenu}
              />
            </Route>

            <Route path="/saved-movies">
              <HeaderLogin
                isLoggedIn={isLoggedIn}
                setIsShowMenu={setIsShowMenu}
              />
            </Route>

            <Route path="/profile">
              <HeaderLogin
                setIsShowMenu={setIsShowMenu}
                currentUser={currentUser}
              />
            </Route>
          </Switch>

          <main className="main">
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>

              <ProtectedRoute
                path="/movies"
                exact
                component={Movies}
                isLoggedIn={isLoggedIn}
                getAllFilms={getAllFilms}
                searchQueryMoviesLocal={searchQueryMoviesLocal}
                handleLikeSelectButton={handleLikeSelectButton}
                likeSelectFilms={likeSelectFilms}
                isPreloader={isPreloader}
                filmsLocal={filmsLocal}
              />

              <ProtectedRoute
                path="/saved-movies"
                exact
                component={SavedMovies}
                isLoggedIn={isLoggedIn}
                handleLikeSelectButton={handleLikeSelectButton}
                likeSelectFilms={likeSelectFilms}
                isPreloader={isPreloader}
                searchQuerySavedMoviesLocal={searchQuerySavedMoviesLocal}
              />

              <ProtectedRoute
                exact
                path="/profile"
                component={Profile}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                handleUpdateUser={handleUpdateUser}
              />

              <Route path="/saved-movies">
                <Profile isLoggedIn={isLoggedIn} onExit={handleExit} />
              </Route>

              <Route path="/signup">
                <Register
                  isReg={isReg}
                  currentUser={currentUser}
                  isLoggedIn={!isLoggedIn}
                  handleRegisterSubmit={handleRegisterSubmit}
                />
              </Route>

              <Route path="/signin" exact>
                <Login
                  currentUser={currentUser}
                  handleLoginSubmit={handleLoginSubmit}
                  isLoggedIn={!isLoggedIn}
                />
              </Route>

              <Route path="/*">
                <NotFound404 />
              </Route>
            </Switch>
          </main>

          <Switch>
            <Route exact path="/">
              <Footer />
            </Route>

            <Route path="/movies">
              <Footer />
            </Route>

            <Route path="/saved-movies">
              <Footer />
            </Route>
          </Switch>
        </React.Fragment>
        <Menu isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
