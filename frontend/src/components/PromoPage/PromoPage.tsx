import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import './promoPage.scss';

const PromoPage: FC = () => {
  const { isLoggedIn } = useTypedSelector(store => store.user);
  return (
    <main>
      <section className="promo">
        <div className="wrapper">
          <div className="info_block">
            <h1 className="title title--bigest">Вдохновляющий и продающий текст! мы такие классные!</h1>
            <p className="content">Тут тоже о том, как классно в нашей аппе учить англ</p>
            {!isLoggedIn ? (
              <Link to="/auth" className="btn">
                Войти
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
      <section className="video" id="video">
        <iframe
          title="rs lang video review"
          src="https://www.youtube.com/embed/qtsNbxgPngA"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="video-player"
        />
      </section>

      <section className="features" id="features">
        <h2>
          Что можно делать в <b>RS lang</b>
        </h2>
        <h3 className="subtitle">
          Тут опять врём, что у нас тут так классно и вот смотрите что можно делать в нашей аппе{' '}
        </h3>
        <div className="features__block">
          <div className="features__geo">
            <img src="./images/feat_1.png" alt="geo" />
            <h4>Lorem ipsum</h4>
            <p className="content">
              Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae
            </p>
          </div>
          <div className="features__stars">
            <img src="./images/feat_2.png" alt="geo" />
            <h4>Lorem ipsum</h4>
            <p className="content">
              Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae
            </p>
          </div>
          <div className="features__power-field">
            <img src="./images/feat_3.png" alt="geo" />
            <h4>Lorem ipsum</h4>
            <p className="content">
              Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae
            </p>
          </div>
        </div>
      </section>

      <section className="team" id="team">
        <h3 className="title">Наша команда</h3>
        <h3 className="subtitle">
          У нас огромная команда из высоквалифицированных лоу-перформеров. Вот тут ниже наши рожицы и кто что делал
        </h3>
        <div className="team__group">
          <div className="teammates">
            <div className="bramov">
              <p className="duty">Max - 10+ years of tech recruiting for VC funded startups</p>
              <div className="teammate__info">
                <img src="https://avatars.githubusercontent.com/u/54726292?v=4" alt="Bramov" />
                <div className="name">Alexey Abramov</div>
              </div>
            </div>

            <div className="ainuAnna">
              <p className="duty">Max - 10+ years of tech recruiting for VC funded startups</p>
              <div className="teammate__info">
                <img src="https://avatars.githubusercontent.com/u/65246069?v=4" alt="Ann Tereshko" />
                <div className="name">Ann Tereshko</div>
              </div>
            </div>

            <div className="svetlana-tyshkevich">
              <p className="duty">Max - 10+ years of tech recruiting for VC funded startups</p>
              <div className="teammate__info">
                <img src="https://avatars.githubusercontent.com/u/70635819?v=4" alt="Svetlana Tyshkevich" />
                <div className="name">Svetlana Tyshkevich</div>
              </div>
            </div>

            <div className="gregoryMoskalev">
              <p className="duty">Max - 10+ years of tech recruiting for VC funded startups</p>
              <div className="teammate__info">
                <img src="https://avatars.githubusercontent.com/u/62020954?v=4" alt="Gregory Moskalev" />
                <div className="name">Gregory Moskalev</div>
              </div>
            </div>

            <div className="johnneon">
              <p className="duty">Max - 10+ years of tech recruiting for VC funded startups</p>
              <div className="teammate__info">
                <img src="https://avatars.githubusercontent.com/u/53760291?v=4" alt="Efimovich Evgenii" />
                <div className="name">Efimovich Evgenii</div>
              </div>
            </div>

            <div className="iogsotot">
              <p className="duty">Max - 10+ years of tech recruiting for VC funded startups</p>
              <div className="teammate__info">
                <img src="https://avatars.githubusercontent.com/u/50149163?v=4" alt="Anna Justus" />
                <div className="name">Anna Justus</div>
              </div>
            </div>
            <img src="./images/team_faces.png" alt="team" className="center" />
          </div>
        </div>
      </section>
      <section className="game" id="games">
        <div className="wrapper">
          <h2>Мини-игры</h2>
          <div className="game__grid">
            <Link to="savannah" className="game__block card">
              <img src="./images/savannah_logo.png" alt="savannah" />
              <p className="game__title game__savannah">Саванна</p>
            </Link>
            <Link to="sprint" className="game__block card">
              <img src="./images/sprint_logo.png" alt="sprint" />
              <p className="game__title game__sprint">Спринт</p>
            </Link>
            <Link to="find-pair" className="game__block card">
              <img src="./images/find-pair_logo_3.png" alt="find-pair" />
              <p className="game__title game__find-pair">Найди пару</p>
            </Link>
            <Link to="audiocall" className="game__block card">
              <img src="./images/audiocall_logo_2.png" alt="audiocall" />
              <p className="game__title game__audiocall">Аудиовызов</p>
            </Link>
          </div>
        </div>
      </section>
      <section className="arrow-block">
        <div className="wrapper">
          <h2 className="title">Вот такенных результатов достигните</h2>
          <h3 className="subtitle">Если будете с нами заниматься и ещё с 5ю репетиторами</h3>
          <div className="content_group">
            <ul className="info">
              <li className="info__item">
                <h4>160%</h4>
                <p>Эта цифра - это результат умножения 80 на 2, она сама маленькая из всех представленных здесь цифр</p>
              </li>
              <li className="info__item">
                <h4>200%</h4>
                <p>
                  Цифра явно получше - тут уже целых два нолика есть, что хорошо гармионирует c кружочками знака
                  процентов
                </p>
              </li>
              <li className="info__item">
                <h4>230%</h4>
                <p>Самая огромная наша цифра, мы тут тоже придумаем (может быть ) что она будет значить.</p>
              </li>
            </ul>
            <img src="./images/arrow_img.png" alt="arrows & girl" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default PromoPage;
