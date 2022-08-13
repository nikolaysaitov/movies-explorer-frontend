import React from "react";
import { withRouter, Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "../Register/Register.css";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    props.onSubmit(email, password);
  }
  return (
    <div className="container form__container">
      <div className="form__hello">
        <img className="form__logo" src={logo} alt="Логотип" />
        <h1 className="form__header">Добро пожаловать!</h1>
        <form onSubmit={handleSubmit} className="form__register ">
          <p className="form__text">Имя</p>
          <input
            type="name"
            name="name"
            placeholder="Имя"
            className="form__input"
            required
            id="name-input"
            value={name}
            setValue={setName}
            onChange={handleChangeName}
          />
          <p className="form__text">Email</p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form__input"
            required
            id="email-input"
            value={email}
            setValue={setEmail}
            onChange={handleChangeEmail}
          />
          <p className="form__text">Пароль</p>
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className="form__input"
            required
            id="password-input"
            value={password}
            setValue={setPassword}
            onChange={handleChangePassword}
            minLength="6"
            maxLength="15"
          />
          <span className=""></span>
          <button type="submit" className="form__submit">
            Зарегистрироваться
          </button>
          <p className="authorization__text">
            Уже зарегистрированы?
            <Link className="authorization__text_link" to="/signin">
              {" "}
              Войти
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default withRouter(Register);
