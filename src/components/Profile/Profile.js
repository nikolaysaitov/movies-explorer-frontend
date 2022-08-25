import { useEffect, useState } from "react";
import { useValidationForm } from "../../utils/useValidationForm";
import { Link } from "react-router-dom";
import "./Profile.css";
import { VALIDATION_PARAMS } from "../../utils/constans";

function Profile({ handleUpdateUser, currentUser, handleSignOut, onExit }) {
  const startValues = {
    name: currentUser.name,
    email: currentUser.email,
  };

  const { values, isValid, handleChange, setIsValid } =
    useValidationForm(startValues);

  useEffect(() => {
    const isValidName = VALIDATION_PARAMS.REGEX.NAME.test(values.name);
    const isValidEmail = VALIDATION_PARAMS.REGEX.EMAIL.test(values.email);
    const isChangeName = values.name !== currentUser.name;
    const isChangeEmail = values.email !== currentUser.email;

    isValidName && isValidEmail && (isChangeName || isChangeEmail)
      ? setIsValid(true)
      : setIsValid(false);
  }, [values]);

  function clickUpdateButton() {
    handleUpdateUser(values).then(() => setIsValid(false));
  }

  function clickSignOutButton() {
    handleSignOut();
  }
  return (
    <div className="profile">
      <div className="container profile__container">
        <div className="profile__wrapper">
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
          <form onClick={onExit} className="profile__form">
            <label className="profile__label">
              <p className="profile__text">Имя</p>
              <input
                className="profile__input"
                type="text"
                name="name"
                value={values.name}
                required
                onInput={handleChange}
                placeholder="Ваше новое имя"
              />
            </label>
            <label className="profile__label">
              <p className="profile__text">E-mail</p>
              <input
                className="profile__input"
                type="email"
                name="email"
                value={values.email}
                required
                onInput={handleChange}
                placeholder="Ваш новый E-mail"
              />
            </label>
          </form>
          <div className="profile__buttons">
            <button
              className={
                isValid
                  ? "profile__button"
                  : "profile__button profile__button_off"
              }
              type="button"
              onClick={clickUpdateButton}
            >
              Редактировать
            </button>
            <Link
              to="/signin"
              className="profile__button profile__button_color_red"
            >
              Выйти из аккаунта
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
