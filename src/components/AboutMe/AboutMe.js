import "./AboutMe.css";
import photo from "../../images/photo.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <div className="container about-me__container">
        <h3 className="title about-me__title">Разработчик</h3>
        <div className="about-me__box">
          <div className="about-me__description">
            <p className="about-me__name">Николай</p>
            <p className="about-me__profession">
              Фронтенд-разработчик, 33 года
            </p>
            <p className="about-me__text">
              Я из города Комсомольск-на-Амуре, окончил Комсомольский-на-Амуре
              Государственный Технический Университет по специальности Самолето
              и вертолетостроение. Какое то время работал на авиационном
              предприятии, запускал в небо Sukhoi Superjet 100. Сейчас проживаю в Санкт-Петербурге, увлекаюсь веб-разработкой, занимаюсь
              спортом! В данный момент изучаю React, создаю SPA приложения, в
              ближайших планах освоить TypeScript, до этого был опыт по созданию
              сайтов на CMS Wordpress, Shopify, запуск рекламных кампаний и многое другое.
            </p>
            <ul className="about-me__links">
              <li>
                <a
                  className="about-me__link"
                  href="https://www.instagram.com/nikolay_saitov/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  className="about-me__link"
                  href="https://github.com/nikolaysaitov"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          <img
            className="about-me__photo"
            src={photo}
            alt="Фото для портфолио"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
