import "./MoviesCard.css";
import film from "../../images/film.png";

function MoviesCard() {
  const isFavofiteFilm = false;
  return (
    <li className="card-movies">
      <img className="card-movies__image" src={film} alt="карточки фильмов" />
      <div className="card-movies__description">
        <div className="card-movies__rows">
          <p className="card-movies__name">33 слова о дизайне</p>
          <button
            className={
              isFavofiteFilm
                ? "card-movies__select card-movies__select_active"
                : "card-movies__select"
            }
            type="button"
          ></button>
        </div>
        <p className="card-movies__length">1ч 42м</p>
      </div>
    </li>
  );
}

export default MoviesCard;
