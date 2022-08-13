import "./SearchForm.css";

function SearchForm({
  isShortFilm,
  setIsShortFilm,
  searchQuery,
  setSearchQuery,
  searchFilms,
}) {
  return (
    <section className="search">
      <div className="container search__container">
        <form className="forms-search" onSubmit={searchFilms}>
          <input
            className="forms-search__input"
            name="film"
            type="text"
            placeholder="Фильм"
            value={searchQuery}
            onInput={(e) => setSearchQuery(e.target.value)}
            required
          />
          <button className="forms-search__button" type="submit">
            Поиск
          </button>
        </form>

        <label className="forms-search__label">
          <input
            className="forms-search__checkbox"
            name="short"
            type="checkbox"
            checked={isShortFilm}
            onChange={() => setIsShortFilm(!isShortFilm)}
          />
          <div className="forms-search__custom-checkbox">
            <div className="forms-search__marking"></div>
          </div>
          <p className="forms-search__label-text">Короткометражки</p>
        </label>
      </div>
    </section>
  );
}

export default SearchForm;
