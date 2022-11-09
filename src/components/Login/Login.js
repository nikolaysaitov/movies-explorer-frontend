import React from "react";
import { useValidationForm } from "../../utils/useValidationForm";
import { withRouter, Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Login.css";
import { VALIDATION_CONFIGS } from "../../utils/constans";
import ValidText from "../ValidText/ValidText";

function Login({ handleLoginSubmit, isDisabled }) {
  const { values, errors, isValid, handleChange } = useValidationForm(
    { email: "", password: "" },
    VALIDATION_CONFIGS.LOGIN
  );

  function handleSubmitForm(e) {
    e.preventDefault();
    handleLoginSubmit(values);
  }
  return (
    <div className="container form__container">
      <div className="form__hello">
      <Link to="/">
            <img className="form__logo" src={logo} alt="Логотип" />
          </Link>
        <h1 className="form__header">Рады видеть!</h1>
        <form onSubmit={handleSubmitForm} className="form__register ">
          <p className="form__text">Email</p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form__input"
            required
            id="email-input"
            onInput={handleChange}
            isValid={!errors.email}
            value={values.email}
          />
          {errors.email && <ValidText type="auth">{errors.email}</ValidText>}
          <p className="form__text">Пароль</p>
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className="form__input"
            required
            id="password-input"
            onInput={handleChange}
            isValid={!errors.password}
            value={values.password}
            minLength="6"
            maxLength="15"
          />
          {errors.password && (
            <ValidText type="auth">{errors.password}</ValidText>
          )}
          <span className=""></span>
          <button
            type="submit"
            className={
              !isValid
                ? "form__submit form__submit-login form__submit-off"
                : "form__submit form__submit-login"
            }
            disabled={isDisabled}
          >
            > Войти
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
