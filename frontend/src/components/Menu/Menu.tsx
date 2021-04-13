import './menu.scss';
import { FC, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAction } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import LogoWhite from '../../assets/images/Logo_white.png';
import TextBookIcon from '../../assets/images/textbook_icon.png';
import StatsIcon from '../../assets/images/stats_icon.png';
import SettingsIcon from '../../assets/images/settings_icon.png';
import { LOCATIONS } from '../../constants';

const { textbook } = LOCATIONS;

const Menu: FC = () => {
  const location = useLocation().pathname.split('/')[1];
  const currentLocation = useLocation();
  const { showButtons, showTranslate } = useAction();
  const store = useTypedSelector(commonStore => commonStore);
  const { displayButtons, translate } = store.wordList;
  const { isLoggedIn } = store.user;
  const [openSettings, setOpenSettings] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const toggleSettigns = () => {
    setOpenSettings(!openSettings);
  };

  const onChangeButtons = () => {
    showButtons(!displayButtons);
  };

  const onChangeTranslate = () => {
    showTranslate(!translate);
  };

  useEffect(() => {
    if (location !== textbook) {
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
              <Link to="/textbook/1/1">
                <img src={TextBookIcon} alt="textbook" className="icon" />
              </Link>
            </li>
            {
              isLoggedIn
                ? <li className="menu__item">
                  <Link to="/stats">
                    <img src={StatsIcon} alt="stats" className="icon" />
                  </Link>
                </li>
                : <></>
            }
            <li className="menu__item">
              <Link to="/sprint">
                <i className="fal fa-running fa-3x"/>
              </Link>
            </li>
            <li className="menu__item">
              <Link to="/savannah">
                <i className="fal fa-paw-claws fa-3x"/>
              </Link>
            </li>
            <li className="menu__item">
              <Link to="/puzzle">
                <i className="fal fa-puzzle-piece fa-3x"/>
              </Link>
            </li>
            <li className="menu__item">
              <Link to="/audiocall">
                <i className="fal fa-headphones-alt fa-3x"/>
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
    </aside>
  );
};
export default Menu;
