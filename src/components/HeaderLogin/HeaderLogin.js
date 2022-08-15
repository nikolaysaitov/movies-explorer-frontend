import { useContext } from "react";

import { Link, useHistory } from "react-router-dom";
import "./HeaderLogin.css";
import logo from "../../images/logo.svg";
import AccountButton from "../AccountButton/AccountButton";
// import Navigation from "../Navigation/Navigation";

import { CurrentUserContext } from "../../context/CurrentUserContext";

function HeaderLogin({ setIsShowMenu }) {
  const currentPath = useHistory().location.pathname;
  const isMainPage = currentPath === "/";
  const history = useHistory();
  const { isLoggedIn } = useContext(CurrentUserContext);
  function handleClick() {
    history.push("/");
  }

  const signButtons = isLoggedIn ? (
    <AccountButton />
  ) : (
    <div className="header__navigation">
      <Link className="header__button header__button_auth" to="/signup">
        Регистрация
      </Link>
      <Link className="header__button header__button_enter" to="/signin">
        Войти
      </Link>
    </div>
  );

  function handleClickMenuButton() {
    setIsShowMenu(true);
  }

  return (
    <header
      className="header"
      style={{ backgroundColor: isMainPage && "#dddee3" }}
    >
      <div className="container header__container">
        <div className="header__box">
          <img
            className="logo"
            src={logo}
            alt="Логотип"
            onClick={handleClick}
          />
          {/* {isLoggedIn && <Navigation />} */}
          {signButtons}
          {isLoggedIn && (
            <div
              className="header__menu-button"
              onClick={handleClickMenuButton}
            ></div>
          )}
        </div>
      </div>
    </header>
  );
}

export default HeaderLogin;
