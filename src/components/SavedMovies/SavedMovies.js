import { useState } from "react";
import "./SavedMovies.css";
import SearchForm from "../../components/SearchForm/SearchForm";
import MoviesCardList from "../../components/MoviesCardList/MoviesCardList";

function SavedMovies() {
  const [isShortFilm, setIsShortFilm] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const searchFilms = (evt) => {
    evt.preventDefault();
    console.log(isShortFilm, searchQuery);
  };
  return (
    <div className="saved">
      <div className="container movies__container">
        <SearchForm
          isShortFilm={isShortFilm}
          searchQuery={searchQuery}
          setIsShortFilm={setIsShortFilm}
          setSearchQuery={setSearchQuery}
          searchFilms={searchFilms}
        />
        <MoviesCardList />
      </div>
    </div>
  );
}

export default SavedMovies;
