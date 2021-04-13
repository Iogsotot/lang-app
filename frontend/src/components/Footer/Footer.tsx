import './footer.scss';
import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { FOOTER_COPYRIGHT, LOCATIONS } from '../../constants';

import RSSLogo from '../../assets/images/rs_school_react.png';
import githubLogo from '../../assets/images/github-logo.svg';

const Footer: FC = () => {
  const { sprint, savannah, puzzle, audiocall } = LOCATIONS;
  const location = useLocation();

  // eslint-disable-next-line prefer-destructuring
  const currentLocation = location.pathname.split('/')[1];

  return (
    <div>

      { currentLocation !== sprint
        && currentLocation !== savannah
        && currentLocation !== puzzle
        && currentLocation !== audiocall && (

        <footer>
          <div className="wrapper">
            <div className="links-block">
              <nav className="footer__nav nav">
                <ul className="footer__nav__list nav__list">
                  <li>
                    <h4>RS Lang</h4>
                  </li>
                  <li>
                    <Link to="/#features">Возможности</Link>
                  </li>
                  <li>
                    <Link to="/#video">Видеообзор</Link>
                  </li>
                  <li>
                    <Link to="/#team">Команда</Link>
                  </li>
                  <li>
                    <Link to="/#games">Игры</Link>
                  </li>
                </ul>
              </nav>

              <div className="links-group">
                <div className="RSS">
                  <a href="https://rs.school/react/" className="link">
                    <img src={RSSLogo} className="icon icon--rss" alt="RSSchool" />
                    <div>2021</div>
                  </a>
                </div>

                <div className="developers">
                  <div className="dev-list">
                    <h4>Кто всё это понаделал</h4>
                    {FOOTER_COPYRIGHT.developers.map(item => (
                      <div className="author" key={item.name}>
                        <a href={item.link} className="link">
                          <img src={githubLogo} className="icon" alt="Github" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Footer;
