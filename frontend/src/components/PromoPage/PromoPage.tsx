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
    {/* <Link to="/textbook/0/0">TextBook page</Link>
    <Link to="/savannah">Savannah</Link> */}
  </main>
);

export default PromoPage;
