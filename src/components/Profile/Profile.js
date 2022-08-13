import { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile(onExit) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div className="profile">
      <div className="container profile__container">
        <div className="profile__wrapper">
          <h1 className="profile__title">Привет, {name}</h1>
          <form onClick={onExit} className="profile__form">
            <label className="profile__label">
              <p className="profile__text">Имя</p>
              <input
                className="profile__input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="profile__label">
              <p className="profile__text">E-mail</p>
              <input
                className="profile__input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </form>
          <div className="profile__buttons">
            <button className="profile__button" type="button">
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
