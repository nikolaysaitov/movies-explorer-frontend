import "./SearchForm.css";
import { useEffect, useState } from "react";
import { useValidationForm } from "../../utils/useValidationForm";
import ValidText from "../ValidText/ValidText";

function SearchForm({ searchFilms, searchQueryLocal }) {
  const startValue = { film: "", short: false };
  const { values, isValid, handleChange, setValues, setIsValid } =
    useValidationForm(startValue);
  const [isSearchError, setIsSearchError] = useState(false);

  useEffect(() => {
    const searchQuery = searchQueryLocal.load();
    setValues(searchQuery);
    if (searchQuery) setIsValid(true);
  }, []);

  function onChangeCheckbox(evt) {
    const newValues = { ...values, short: evt.target.checked };
    handleChange(evt);
    searchFilms(newValues);
    searchQueryLocal.save(newValues);
  }

  function handleSubmitForm(evt) {
    evt.preventDefault();
    searchQueryLocal.save(values);
    if (!isValid) {
      setIsSearchError(true);
    } else {
      setIsSearchError(false);
      searchFilms(values);
    }
  }

  return (
    <section className="search">
      <div className="container search__container">
        <form className="forms-search" onSubmit={handleSubmitForm} noValidate>
          <input
            className="forms-search__input"
            name="film"
            type="text"
            placeholder="Фильм"
            value={values.film}
            onInput={handleChange}
            required
          />
          <button className="forms-search__button" type="submit">
            Поиск
          </button>
        </form>
        {isSearchError && (
          <ValidText type="search">Нужно ввести ключевое слово</ValidText>
        )}
        <label className="forms-search__label">
          <input
            className="forms-search__checkbox"
            name="short"
            type="checkbox"
            checked={values.short}
            onChange={onChangeCheckbox}
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
