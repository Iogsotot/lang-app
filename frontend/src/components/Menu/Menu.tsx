import { FC } from 'react';
import { Link } from 'react-router-dom';
import './menu.scss';

const Menu: FC = () => (
  <aside className="menu">
    <div className="top-group">
      <div className="logo-field">
        <Link to="/">
          <img src="./images/logo_white.png" alt="RS Lang" />
        </Link>
      </div>
      <nav>
        <ul className="menu__list">
          <li className="menu__item">
            <Link to="/textbook/0/0">
              <img src="./images/textbook_icon.png" alt="textbook" className="icon" />
            </Link>
          </li>
          <li className="menu__item">
            <Link to="/stats">
              <img src="./images/stats_icon.png" alt="stats" className="icon" />
            </Link>
          </li>
          <li className="menu__item">
            <Link to="/sprint">
              <img src="./images/game_icon.png" alt="sprint" className="icon" />
            </Link>
          </li>
          <li className="menu__item">
            <Link to="/savannah">
              <img src="./images/game_icon.png" alt="savannah" className="icon" />
            </Link>
          </li>
          <li className="menu__item">
            <Link to="/find-pair">
              <img src="./images/game_icon.png" alt="find-pair" className="icon" />
            </Link>
          </li>
          <li className="menu__item">
            <Link to="/audiocall">
              <img src="./images/game_icon.png" alt="audiocall" className="icon" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    <div className="down-group">
      <Link to="/audiocall">
        <img src="./images/settings_icon.png" alt="setting" className="icon" />
      </Link>
    </div>
  </aside>
);

export default Menu;
