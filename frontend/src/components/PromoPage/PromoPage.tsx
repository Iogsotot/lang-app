import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import './promoPage.scss';

const PromoPage: FC = () => {
  const { isLoggedIn } = useTypedSelector(store => store.user);
  return (
    <main>
      <section className="promo">
        <ScrollAnimation animateIn="zoomIn">
          <div className="wrapper">
            <div className="info_block">
              <h1 className="title title--bigest">Учи английский вместе с RSlang!</h1>
              <p className="content">Проводи время весело и с пользой! Ускорь свой прогресс! Возобновляй знания!</p>
              {!isLoggedIn ? (
                <Link to="/auth" className="btn">
                  Войти
                </Link>
              ) : (
                <></>
              )}
            </div>
          </div>
        </ScrollAnimation>
      </section>
      <section className="video" id="video">
        <iframe
          title="rs lang video review"
          src="https://www.youtube.com/embed/jpMpVQut-1I"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="video-player"
        />
      </section>
      <section className="features" id="features">
        <ScrollAnimation animateIn="bounceInUp">
          <h2>
            Что можно делать в <b>RS lang</b>
          </h2>
          <h3 className="subtitle">
            Вместе с нами вы можете заниматься где угодно и когда удобно благодаря удобному и бесплатному доступу!{' '}
          </h3>
        </ScrollAnimation>
        <div className="features__block">
          <ScrollAnimation animateIn="bounceInUp">
            <div className="features__geo">
              <img src="./images/feat_1.png" alt="geo" />
              <h4>Всегда под рукой</h4>
              <p className="content">
                Занимайтесь из дома, на работе или в путешествии — с компьютера или смартфона.
              </p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation animateIn="bounceInUp">
            <div className="features__stars">
              <img src="./images/feat_2.png" alt="geo" />
              <h4>Обучение в играх и карточках</h4>
              <p className="content">
                Игровая практика доказала свою эффективность в изучении языков для всех возрастов.
              </p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation animateIn="bounceInUp">
            <div className="features__power-field">
              <img src="./images/feat_3.png" alt="geo" />
              <h4>Отслеживание прогресса</h4>
              <p className="content">
                Вы можете видеть результаты своей работы наглядно с помощью статистики.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <section className="team" id="team">
        <ScrollAnimation animateIn="bounceInUp">
          <h3 className="title">Наша команда</h3>
          <h3 className="subtitle">
            У нас огромная команда из высоквалифицированных лоу-перформеров. Вот тут ниже наши рожицы и кто что делал
          </h3>
        </ScrollAnimation>
        <ScrollAnimation animateIn="bounceInUp">
          <div className="team__group">
            <div className="teammates">
              <div className="bramov">
                <p className="duty">"Puzzle game", бэк, ловля багов и ревью кода.</p>
                <div className="teammate__info">
                  <img src="https://avatars.githubusercontent.com/u/54726292?v=4" alt="Bramov" />
                  <div className="name">Alexey Abramov</div>
                </div>
              </div>

              <div className="ainuAnna">
                <p className="duty">Стили, адаптив, темная тема, анимации, тесты.</p>
                <div className="teammate__info">
                  <img src="https://avatars.githubusercontent.com/u/65246069?v=4" alt="Ann Tereshko" />
                  <div className="name">Ann Tereshko</div>
                </div>
              </div>

              <div className="svetlana-tyshkevich">
                <p className="duty">"Audiocall game", графики на странице статистики.</p>
                <div className="teammate__info">
                  <img src="https://avatars.githubusercontent.com/u/70635819?v=4" alt="Svetlana Tyshkevich" />
                  <div className="name">Svetlana Tyshkevich</div>
                </div>
              </div>

              <div className="gregoryMoskalev">
                <p className="duty">"Sprint game", бэк, ловля багов и ревью кода.</p>
                <div className="teammate__info">
                  <img src="https://avatars.githubusercontent.com/u/62020954?v=4" alt="Gregory Moskalev" />
                  <div className="name">Gregory Moskalev</div>
                </div>
              </div>

              <div className="johnneon">
                <p className="duty">И.о. тимлида, авторизация, словарь, учебник, стили, бэк, redux, ревью кода. </p>
                <div className="teammate__info">
                  <img src="https://avatars.githubusercontent.com/u/53760291?v=4" alt="Efimovich Evgenii" />
                  <div className="name">Efimovich Evgenii</div>
                </div>
              </div>

              <div className="iogsotot">
                <p className="duty">Тимлид, "Savannah game", бэк, макет, ловля багов и ревью кода.</p>
                <div className="teammate__info">
                  <img src="https://avatars.githubusercontent.com/u/50149163?v=4" alt="Anna Justus" />
                  <div className="name">Anna Justus</div>
                </div>
              </div>
              <img src="./images/team_faces.png" alt="team" className="center" />
            </div>
          </div>
        </ScrollAnimation>
      </section>
      <section className="game" id="games">
        <div className="wrapper">
          <ScrollAnimation animateIn="bounceInUp">
            <h2>Мини-игры</h2>
          </ScrollAnimation>
          <div className="game__grid">
            <ScrollAnimation animateIn="zoomIn">
              <Link to="savannah" className="game__block card">
                <img src="./images/savannah_logo.png" alt="savannah" />
                <p className="game__title game__savannah">Саванна</p>
              </Link>
            </ScrollAnimation>
            <ScrollAnimation animateIn="zoomIn">
              <Link to="sprint" className="game__block card">
                <img src="./images/sprint_logo.png" alt="sprint" />
                <p className="game__title game__sprint">Спринт</p>
              </Link>
            </ScrollAnimation>
            <ScrollAnimation animateIn="zoomIn">
              <Link to="puzzle" className="game__block card">
                <img src="./images/find-pair_logo_3.png" alt="find-pair" />
                <p className="game__title game__find-pair">Паззл</p>
              </Link>
            </ScrollAnimation>
            <ScrollAnimation animateIn="zoomIn">
              <Link to="audiocall" className="game__block card">
                <img src="./images/audiocall_logo_2.png" alt="audiocall" />
                <p className="game__title game__audiocall">Аудиовызов</p>
              </Link>
            </ScrollAnimation>
          </div>
        </div>
      </section>
      <section className="arrow-block">
        <div className="wrapper">
          <ScrollAnimation animateIn="bounceInUp">
            <h2 className="title">С <b>RS lang</b> Вы сможете достигнуть высоких результатов</h2>
            <h3 className="subtitle">Немного об английском в цифрах и фактах. Все это станет Вам доступным!</h3>
          </ScrollAnimation>

          <div className="content_group">
            <ul className="info">
              <ScrollAnimation animateIn="lightSpeedIn">
                <li className="info__item">
                  <h4>33%</h4>
                  <p>От населения земли во всем мире свободно разговаривают на английском языке.</p>
                </li>
              </ScrollAnimation>
              <ScrollAnimation animateIn="lightSpeedIn">
                <li className="info__item">
                  <h4>50%</h4>
                  <p>Всех научных и технических публикаций написаны выходят на английском языке.</p>
                </li>
              </ScrollAnimation>
              <ScrollAnimation animateIn="lightSpeedIn">
                <li className="info__item">
                  <h4>75%</h4>
                  <p>Всех писем и телеграмм написаны на английском языке.</p>
                </li>
              </ScrollAnimation>
              <ScrollAnimation animateIn="lightSpeedIn">
                <li className="info__item">
                  <h4>85%</h4>
                  <p>Международных конференций и организаций используют английский язык.</p>
                </li>
              </ScrollAnimation>
              <ScrollAnimation animateIn="lightSpeedIn">
                <li className="info__item">
                  <h4>90%</h4>
                  <p>
                    Всей информации в Интернете хранится на английском языке.
                  </p>
                </li>
              </ScrollAnimation>
            </ul>
            <ScrollAnimation animateIn="zoomIn">
              <img src="./images/stats.jpg" alt="arrows & girl" />
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PromoPage;
