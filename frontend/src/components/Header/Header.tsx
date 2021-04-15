import './header.scss';
import { FC, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useAction } from '../../hooks/useAction';
import avatarHolder from '../../assets/icons/avatar-holder.png';
import logoutIcon from '../../assets/icons/logout.png';
import LogoDark from '../../assets/images/Logo_dark.png';
import dictionaryIcon from '../../assets/images/dictionary_icon.png';
import { LOCATIONS } from '../../constants';

const { textbook, dictionary } = LOCATIONS;

const Header: FC = () => {
  const history = useHistory();
  const { isLoggedIn, user } = useTypedSelector(store => store.user);
  const { avatar, email, name } = user;
  const { logout } = useAction();
  const [isDictionaryPage, setIsDictionaryPage] = useState(false);
  const [showDictionaryIcon, setShowDictionaryIcon] = useState(false);

  useEffect(() => history.listen(() => {
    const location = history?.location?.pathname?.split('/')[1];
    if (location === dictionary) {
      setIsDictionaryPage(true);
    } else {
      setIsDictionaryPage(false);
    }
    if (location === dictionary || location === textbook) {
      setShowDictionaryIcon(true);
    } else {
      setShowDictionaryIcon(false);
    }
  }), [history]);

  return (
    <header>
      <div className="header__inner">
        <a href="/" className="header__logo-field">
          <img src={LogoDark} alt="RS Lang" />
        </a>
        <nav className="nav">
          <a href="/#features" className="nav__link">
            Возможности
          </a>
          <a href="/#video" className="nav__link">
            Видеообзор
          </a>
          <a href="/#team" className="nav__link">
            Команда
          </a>
          <a href="/#games" className="nav__link">
            Игры
          </a>
        </nav>

        <div className="user__menu">
          {isLoggedIn ? (
            <>
              { showDictionaryIcon ?
                <Link
                  className={`dictionary__btn ${isDictionaryPage ? 'active' : ''}`}
                  to="/dictionary/learning/1/1"
                >
                  <img src={dictionaryIcon} alt=""/>
                </Link>
                : <></>
              }
              <div className="user">
                <div className="user__info">
                  <p>{name}</p>
                  <p>{email}</p>
                </div>
                <div className="user__icon">
                  <img src={avatar || avatarHolder} alt="" />
                </div>
              </div>
              <button className="user__logout" onClick={logout}>
                <img src={logoutIcon} alt="" />
              </button>
            </>
          ) : (
            <Link className="btn btn--auth" to="/auth">
              Вход / Регистрация
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
