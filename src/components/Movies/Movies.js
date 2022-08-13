import { useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies() {
  const [isShortFilm, setIsShortFilm] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const searchFilms = (evt) => {
    evt.preventDefault();
    console.log(isShortFilm, searchQuery);
  };
  return (
    <div className="movies">
      <div className="container movies__container">
        <SearchForm
          isShortFilm={isShortFilm}
          searchQuery={searchQuery}
          setIsShortFilm={setIsShortFilm}
          setSearchQuery={setSearchQuery}
          searchFilms={searchFilms}
        />
        <MoviesCardList />
        <button className="movies__more-button" type="button">
          Ещё
        </button>
      </div>
    </div>
  );
}

export default Movies;
