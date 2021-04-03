import './footer.scss';
import { FC } from 'react';
import { FOOTER_COPYRIGHT } from '../../constants';
import RSSLogo from '../../assets/images/rs_school_react.png';
import githubLogo from '../../assets/images/github-logo.svg';

const Footer: FC = () => (
  <footer>
    <div className="wrapper">
      <div className="links-block">
        <nav className="footer__nav nav">
          <ul className="footer__nav__list nav__list">
            <li>
              <h4>RS Lang</h4>
            </li>
            <li>
              <a href="#features">Возможности</a>
            </li>
            <li>
              <a href="#video">Видеообзор</a>
            </li>
            <li>
              <a href="#team">Команда</a>
            </li>
            <li>
              <a href="#games">Игры</a>
            </li>
          </ul>
        </nav>

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
          <div className="RSS">
            <img src={RSSLogo} className="icon" alt="RSSchool" />
            <a href="https://rs.school/react/" className="link">
              2021
            </a>
          </div>
          <div className="youtube">
            <img src={youtubeLogo} className="icon" alt="youtube link" />
            <a href="https://www.youtube.com/watch?v=dpw9EHDh2bM&t=1s" className="link">
              review
            </a>
          </div>
        </div>
      </div>
      <div className="RSS">
        <a href="https://rs.school/react/" className="link">
          <img src={RSSLogo} className="icon icon--rss" alt="RSSchool" />
          <div>2021</div>
        </a>
      </div>
    </div>
  </footer>
);
export default Footer;
