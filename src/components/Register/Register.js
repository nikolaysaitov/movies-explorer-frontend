import React from "react";
import { useValidationForm } from "../../utils/useValidationForm";
import { withRouter, Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "../Register/Register.css";
import ValidText from "../ValidText/ValidText";
import { VALIDATION_CONFIGS } from "../../utils/constans";
import CallbackValidation from "../../utils/useValidationForm";


function Register({ handleRegisterSubmit, isDisabled }) {
  // const { values, errors, isValid, handleChange } = useValidationForm(
  //   { name: "", email: "", password: "" },
  //   VALIDATION_CONFIGS.USER_DATA
  // );


  const formCallbackValidation = CallbackValidation();
  const {email, password, name} = formCallbackValidation.values;
  const {values, onFocus, isValid, handleChange2, isFocused, errors} = formCallbackValidation
  

  function handleSubmit(e) {
    e.preventDefault();
    handleRegisterSubmit(values);
  }
  return (
    <div className="container form__container">
      <div className="form__hello">
      <Link to="/">
            <img className="form__logo" src={logo} alt="Логотип" />
          </Link>
        {/* <img className="form__logo" src={logo} alt="Логотип" /> */}
        <h1 className="form__header">Добро пожаловать!</h1>
        <form onSubmit={handleSubmit} className="form__register validation={formCallbackValidation}">
          <p className="form__text">Имя</p>
          <input
            name="name"
            placeholder="Имя"
            className="form__input"
            required
            id="name-input"
            onInput={handleChange2}
            isValid={!errors.name}
            value={values.name || ''}
            onFocus={onFocus}
          />
          {errors.name && <ValidText type="auth">{errors.name}</ValidText>}
          <p className="form__text">Email</p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form__input"
            required
            id="email-input"
            onInput={handleChange2}
            isValid={!errors.email}
            value={values.email || ''}
            onFocus={onFocus}
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
            onInput={handleChange2}
            isValid={!errors.password}
            value={values.password  || ''}
            onFocus={onFocus}
          />
          {errors.password && (
            <ValidText type="auth">{errors.password}</ValidText>
          )}
          <span className=""></span>
          <button
            type="submit"
            className={
              (errors.email || errors.name || errors.password) ? "form__submit form__submit-off" : "form__submit"
            }
            disabled={isDisabled}
          >
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