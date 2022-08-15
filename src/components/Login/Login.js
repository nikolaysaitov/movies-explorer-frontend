import React from "react";

import { withRouter, Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Login.css";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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
        <h1 className="form__header">Рады видеть!</h1>
        <form onSubmit={handleSubmit} className="form__register ">
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
          <button type="submit" className="form__submit form__submit-login">
            Войти
          </button>
          <p className="authorization__text">
            Еще не зарегистрированы?
            <Link className="authorization__text_link" to="/signup">
              {" "}
              Зарегистрироваться
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default withRouter(Login);
