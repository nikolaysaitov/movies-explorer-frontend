import { useState, useEffect } from "react";
import "./SavedMovies.css";
import SearchForm from "../../components/SearchForm/SearchForm";
import MoviesCardList from "../../components/MoviesCardList/MoviesCardList";
import { MESSAGES, SHORT_DURATION } from "../../utils/constans";
import { filterFilms } from "../../utils/filterFilms";

function SavedMovies({
  likeSelectFilms,
  handleLikeSelectButton,
  searchQuerySavedMoviesLocal,
}) {
  const [likedFilms, setLikedFilms] = useState(null);
  const [shownFilms, setShownFilms] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSelectFilms();
  }, []);

  function getSelectFilms() {
    startLoader();
    likeSelectFilms()
      .then((films) => {
        setAllFilms(films); /// добавил data, иначе не рендерятся сохраненные фильмы
        hideErrorMessage();
      })
      .catch(() => {
        showErrorMessage(MESSAGES.ERROR);
      })
      .finally(() => {
        stopLoader();
      });
  }

  function searchFilms(values) {
    const films = filterFilms(likedFilms, SHORT_DURATION, values);
    setShownFilms(films);

    films?.length ? hideErrorMessage() : showErrorMessage(MESSAGES.NOT_FOUND);
  }

  function handleDeleteFilm(filmId) {
    handleLikeSelectButton(filmId).then(() =>
      setAllFilms(likedFilms.filter((film) => film._id !== filmId))
    );
  }

  function setAllFilms(films) {
    setLikedFilms(films);
    setShownFilms(films);
  }

  function startLoader() {
    setIsLoading(true);
  }

  function stopLoader() {
    setIsLoading(false);
  }

  function showErrorMessage(message) {
    setErrorMessage(message);
  }

  function hideErrorMessage() {
    setErrorMessage(null);
  }

  return (
    <div className="saved">
      <div className="container movies__container">
        <SearchForm
          searchFilms={searchFilms}
          searchQueryLocal={searchQuerySavedMoviesLocal}
        />
        <MoviesCardList
          films={shownFilms}
          isLoading={isLoading}
          message={errorMessage}
          handleLikeSelectButton={handleDeleteFilm}
        />
      </div>
    </div>
  );
}

export default SavedMovies;
