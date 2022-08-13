import { NavLink } from "react-router-dom";
import AccountButton from "../AccountButton/AccountButton";
import "./Menu.css";

function Menu({ isShowMenu, setIsShowMenu }) {
  return (
    <div className={isShowMenu ? "menu menu_active" : "menu"}>
      <div className="menu__wrapper">
        <button
          className="menu__close-button"
          onClick={() => setIsShowMenu(false)}
          type="button"
        ></button>
        <nav className="menu__nav">
          <ul className="menu__nav-list">
            <li>
              <NavLink
                className="menu__nav-link"
                activeClassName="menu__nav-link_active"
                to="/"
                exact
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                className="menu__nav-link"
                activeClassName="menu__nav-link_active"
                to="/movies"
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                className="menu__nav-link"
                activeClassName="menu__nav-link_active"
                to="/saved-movies"
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
        </nav>
        <AccountButton />
      </div>
    </div>
  );
}

export default Menu;
