import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './promoPage.scss';
import { PromoPageProps } from './PromoPage.model';

import Menu from '../Menu';

const PromoPage: FC<PromoPageProps> = () => (
  <main>
    <section className="promo">
      <div className="wrapper">
        <div className="info_block">
          <h1 className="title title--bigest">Вдохновляющий и продающий текст! мы такие классные!</h1>
          <p className="content">Тут тоже о том, как классно в нашей аппе учить англ</p>
          <Link to="/auth" className="btn">
            Войти
          </Link>
        </div>
      </div>
    </section>
    <section className="video">
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
            Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae
          </p>
        </div>
        <div className="features__stars">
          <img src="./images/feat_2.png" alt="geo" />
          <h4>Lorem ipsum</h4>
          <p className="content">
            Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae
          </p>
        </div>
        <div className="features__power-field">
          <img src="./images/feat_3.png" alt="geo" />
          <h4>Lorem ipsum</h4>
          <p className="content">
            Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae
          </p>
        </div>
      </div>
    </section>

    <section className="team">
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
              <div className="name">Bramov</div>
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
    {/* <Link to="/textbook/0/0">TextBook page</Link>
    <Link to="/savannah">Savannah</Link> */}
  </main>
);

export default PromoPage;
