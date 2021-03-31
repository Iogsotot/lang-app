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
    {/* <Link to="/textbook/0/0">TextBook page</Link>
    <Link to="/savannah">Savannah</Link> */}
  </main>
);

export default PromoPage;
