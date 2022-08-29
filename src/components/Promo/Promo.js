import { Link } from "react-router-dom";
import "./Promo.css";
import promo from "../../images/text__COLOR_landing-logo.svg";

function Promo() {
  return (
    <section className="promo">
      <div className="container promo__container">
        <div className="promo__text">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <h2 className="promo__subtitle">
            {" "}
            Листайте ниже чтобы узнать больше про этот проект и его создателя.{" "}
          </h2>
          <Link className="promo__button" to="/">
            Узнать больше
          </Link>
        </div>

        <div>
          {" "}
          <img className="promo__logo" src={promo} alt="Логотип" />
        </div>
      </div>
    </section>
  );
}

export default Promo;
