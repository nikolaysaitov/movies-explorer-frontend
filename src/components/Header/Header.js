import { Link, useHistory } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import logo from "../../images/logo.svg";
// import Navigation from "../Navigation/Navigation";
// import { useState } from "react";
import AccountButton from "../AccountButton/AccountButton";
import { CurrentUserContext } from "../../context/CurrentUserContext"

function Header(props) {
  const currentPath = useHistory().location.pathname;
  const isMainPage = currentPath === "/";
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoggedIn } = useContext(CurrentUserContext)

  const signButtons = !isLoggedIn ? (
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

  return (
    <header
      className="header"
      style={{ backgroundColor: isMainPage && "#dddee3" }}
    >
      <div className="container header__container">
        <div className="header__box">
          <img className="logo" src={logo} alt="Логотип" />
          {/* {isLoggedIn && <Navigation />} */}
          {signButtons}
          {/* {isLoggedIn && <div className="header__menu-button"></div>} */}
        </div>
      </div>
    </header>
  );
}

export default Header;
