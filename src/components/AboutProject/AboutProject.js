import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="project">
      <div className="container project__container">
        <h3 className="title project__title">О проекте</h3>
        <div className="project__description">
          <div className="project__description-column">
            <p className="project__description-title">
              Данный проект включал 5 этапов
            </p>
            <p className="project__description-text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="project__description-column">
            <p className="project__description-title">
              На разработку этого SPA ушло 5 недель
            </p>
            <p className="project__description-text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно его закончить.
            </p>
          </div>
        </div>
        <div className="project__progress">
          <div className="project__progress-column">
            <div className="project__progress-bar project__progress-bar_color_blue">
              1 неделя
            </div>
            <p className="project__progress-title">Back-end</p>
          </div>
          <div className="project__progress-column">
            <div className="project__progress-bar">4 недели</div>
            <p className="project__progress-title">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AboutProject;
