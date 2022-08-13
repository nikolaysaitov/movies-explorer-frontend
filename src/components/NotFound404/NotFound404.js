import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import "./NotFound404.css";

function NotFound404() {
  const history = useHistory();

  function handleClick() {
    history.goBack();
  }
  return (
    <div className="notFound">
      <div className="notFound__container">
        <p className="notFound__title">404</p>
        <p className="notFound__subtitle">Страница не найдена</p>
      </div>
      <button className="notFound__back" onClick={handleClick} type="button">
        Назад
      </button>
    </div>
  );
}

export default withRouter(NotFound404);
