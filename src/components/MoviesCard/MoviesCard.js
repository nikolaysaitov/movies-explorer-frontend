import "./MoviesCard.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BASE_URL, PAGES } from "../../utils/constans";
import { formatDuration } from "../../utils/formatDuration";
import film from "../../images/film.png";

function MoviesCard({ film, handleLikeSelectButton }) {
  const [filmId, setFilmId] = useState("");
  const isSavedMovies = useHistory().location.pathname === PAGES.SAVED_MOVIES;
  const imageUrl =
    film.thumbnail || `${BASE_URL}/${film.image.formats.thumbnail.url}`;

  useEffect(() => {
    const filmId = film._id;
    if (filmId) setFilmId(filmId);
  }, []);

  function clickSelectButton() {
    if (isSavedMovies) {
      handleLikeSelectButton(filmId);
    } else {
      const filmData = {
        country: film.country || "-",
        director: film.director,
        duration: film.duration,
        year: film.year,
        nameRU: film.nameRU,
        nameEN: film.nameEN || "-",
        description: film.description,
        image: BASE_URL + film.image.url,
        trailerLink: film.trailerLink,
        thumbnail: BASE_URL + film.image.formats.thumbnail.url,
        movieId: film.id,
      };

      handleLikeSelectButton(filmId, filmData).then((film) => {
        setFilmId(filmId ? "" : film._id);
      });
    }
  }

  return (
    <li className="card-movies">
      <img className="card-movies__image" src={imageUrl} alt={film.nameRU} />
      <div className="card-movies__description">
        <div className="card-movies__rows">
          <p className="card-movies__name">{film.nameRU}</p>
          <button
            className={
              filmId
                ? "card-movies__select card-movies__select_active"
                : "card-movies__select"
            }
            type="button"
            onClick={clickSelectButton}
          ></button>
        </div>
        <p className="card-movies__length">{formatDuration(film.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
