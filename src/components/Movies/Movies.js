import { useEffect, useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { filterFilms } from "../../utils/filterFilms";
import {
  MESSAGES,
  CARD_COUNT,
  CARD_BRAKEPOINT,
  SHORT_DURATION,
} from "../../utils/constans";
import { formatSelectedFilms, setSelect } from "../../utils/select";
import { useCountCard } from "../../utils/useCountCard";

function Movies({
  getAllFilms,
  searchQueryMoviesLocal,
  handleLikeSelectButton,
  filmsLocal,
  likeSelectFilms,
}) {
  const [allFilms, setAllFilms] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [queryValues, setQueryValues] = useState(null);
  const [shownFilms, setShownFilms] = useState(null);
  const [filtredFilms, setFiltredFilms] = useState(null);
  const [selectedFilms, setSelectedFilms] = useState(null);
  const { countAddFilms, startCountFilms, setParamsCountFilms } = useCountCard(
    CARD_COUNT,
    CARD_BRAKEPOINT
  );

  useEffect(() => {
    getSelectFilms();
    setCountViewFilms();
    addResizeEvent();
    return () => removeResizeEvent();
  }, []);

  useEffect(() => {
    if (selectedFilms && !isLoading) {
      loadFilmsLocal();
    }
  }, [selectedFilms, isLoading]);

  useEffect(() => {
    if (allFilms?.length && queryValues) {
      const films = filterFilms(allFilms, SHORT_DURATION, queryValues);
      saveFilmsLocal(films);
      setFiltredFilms(films);

      films?.length ? hideErrorMessage() : showErrorMessage(MESSAGES.NOT_FOUND);
    }
  }, [allFilms, queryValues]);

  useEffect(() => {
    if (filtredFilms?.length) {
      const films = setSelect(filtredFilms, selectedFilms);
      setShownFilms([...films.slice(0, startCountFilms)]);
    }
  }, [filtredFilms, startCountFilms]);

  function getSelectFilms() {
    startLoader();
    likeSelectFilms()
      .then((films) => {
        setSelectedFilms(formatSelectedFilms(films));
        hideErrorMessage();
      })
      .catch(() => {
        showErrorMessage(MESSAGES.ERROR);
      })
      .finally(() => {
        stopLoader();
      });
  }
  function setCountViewFilms() {
    setParamsCountFilms("all");
  }
  function addResizeEvent() {
    window.addEventListener("resize", setParamsCountFilms);
  }
  function removeResizeEvent() {
    window.removeEventListener("resize", setParamsCountFilms);
  }
  function loadFilmsLocal() {
    const localFilms = filmsLocal.load();
    setFiltredFilms(localFilms);
  }
  function saveFilmsLocal(films) {
    filmsLocal.save(films);
  }

  function startLoader() {
    setIsLoading(true);
  }
  function hideErrorMessage() {
    setErrorMessage(null);
  }
  function showErrorMessage(message) {
    setErrorMessage(message);
  }

  function stopLoader() {
    setIsLoading(false);
  }

  function showAllFilms() {
    startLoader();
    getAllFilms()
      .then((films) => {
        setAllFilms(films);
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
    if (!allFilms?.length) showAllFilms();
    setQueryValues(values);
  }

  function showMoreFilms() {
    const startIndex = shownFilms.length;
    const endIndex = startIndex + countAddFilms;

    setShownFilms([
      ...shownFilms,
      ...filtredFilms.slice(startIndex, endIndex),
    ]);
  }

  return (
    <div className="movies">
      <div className="container movies__container">
        <SearchForm
          searchFilms={searchFilms}
          searchQueryLocal={searchQueryMoviesLocal}
        />
        <MoviesCardList
          films={shownFilms}
          isLoading={isLoading}
          message={errorMessage}
          handleLikeSelectButton={handleLikeSelectButton}
        />
        {filtredFilms &&
          filtredFilms?.length > 3 &&
          filtredFilms?.length !== shownFilms?.length && (
            <button
              className="movies__more-button"
              type="button"
              onClick={() => showMoreFilms()}
            >
              Ещё
            </button>
          )}
      </div>
    </div>
  );
}

export default Movies;
