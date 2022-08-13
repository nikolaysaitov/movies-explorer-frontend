import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="header__nav nav">
      <ul className="nav__list">
        <li>
          <Link
            className="nav__link"
            activeClassName="nav__link_active"
            to="/movies"
          >
            Фильмы
          </Link>
        </li>
        <li>
          <Link
            className="nav__link"
            activeClassName="nav__link_active"
            to="/saved-movies"
          >
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
