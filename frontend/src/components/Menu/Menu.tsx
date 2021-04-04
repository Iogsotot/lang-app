import { FC, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './menu.scss';
import { useAction } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import LogoWhite from '../../assets/images/Logo_white.png';
import TextBookIcon from '../../assets/images/textbook_icon.png';
import StatsIcon from '../../assets/images/stats_icon.png';
import GameIcon from '../../assets/images/game_icon.png';
import SettingsIcon from '../../assets/images/settings_icon.png';
import { storageNames, locations } from '../../constants';

const { TEXTBOOK } = locations;

const { SHOW_BUTTONS, SHOW_TRANSLATE } = storageNames;

const Menu: FC = () => {
  const location = useLocation().pathname.split('/')[1];
  const { showButtons, showTranslate } = useAction();
  const { displayButtons, translate } = useTypedSelector(store => store.wordList);
  const [openSettings, setOpenSettings] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const toggleSettigns = () => {
    setOpenSettings(!openSettings);
  };

  const onChangeButtons = () => {
    localStorage.setItem(SHOW_BUTTONS, `${!displayButtons}`);
    showButtons(!displayButtons);
  };

  const onChangeTranslate = () => {
    localStorage.setItem(SHOW_TRANSLATE, `${!translate}`);
    showTranslate(!translate);
  };

  useEffect(() => {
    showButtons(!!JSON.parse(localStorage.getItem(SHOW_BUTTONS) || 'false'));
    showTranslate(!!JSON.parse(localStorage.getItem(SHOW_TRANSLATE) || 'false'));
    if (location !== TEXTBOOK) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [location]);

  return (
    <aside className="menu">
      <div className="top-group">
        <a href="/" className="logo-field">
          <img src={LogoWhite} alt="RS Lang" />
        </a>
        <nav>
          <ul className="menu__list">
            <li className="menu__item">
              <Link to="/textbook/0/0">
                <img src={TextBookIcon} alt="textbook" className="icon" />
              </Link>
            </li>
            <li className="menu__item">
              <Link to="/stats">
                <img src={StatsIcon} alt="stats" className="icon" />
              </Link>
            </li>
            <li className="menu__item">
              <Link to="/sprint">
                <img src={GameIcon} alt="sprint" className="icon" />
              </Link>
            </li>
            <li className="menu__item">
              <Link to="/savannah">
                <img src={GameIcon} alt="savannah" className="icon" />
              </Link>
            </li>
            <li className="menu__item">
              <Link to="/find-pair">
                <img src={GameIcon} alt="find-pair" className="icon" />
              </Link>
            </li>
            <li className="menu__item">
              <Link to="/audiocall">
                <img src={GameIcon} alt="audiocall" className="icon" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="down-group">
        <button className="btn-menu__settings" onClick={toggleSettigns}>
          <img src={SettingsIcon} alt="setting" className="icon" />
        </button>
        <div className={`hidden__menu ${openSettings ? 'active' : ''}`}>
          <div className="hidden__menu-item">
            <div className="field">
              <input
                onChange={onChangeTranslate}
                checked={translate}
                disabled={disabled}
                id="switchTranslate"
                type="checkbox"
                name="switchTranslate"
                className="switch is-info"
              />
              <label htmlFor="switchTranslate">Показывать перевод</label>
            </div>
            <div className="hidden__menu-item">
              <div className="field">
                <input
                  onChange={onChangeButtons}
                  checked={displayButtons}
                  disabled={disabled}
                  id="switchButtons"
                  type="checkbox"
                  name="switchButtons"
                  className="switch is-info"
                />
                <label htmlFor="switchButtons">Показывать кнопки</label>
              </div>
            </div>
          </div>
        </div>
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
      <div className="down-group">
        <Link to="/audiocall">
          <img src="./images/settings_icon.png" alt="setting" className="icon" />
        </Link>
      </div>
    </aside>
  );
};
export default Menu;
