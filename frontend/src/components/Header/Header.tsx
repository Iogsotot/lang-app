import './header.scss';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useAction } from '../../hooks/useAction';
import avatarHolder from '../../assets/icons/avatar-holder.png';
import logoutIcon from '../../assets/icons/logout.png';

const Header: FC = () => {
  const { isLoggedIn, user } = useTypedSelector((store) => store.user);
  const {
    avatar,
    email,
    name,
  } = user;
  const { logout } = useAction();

  return (
    <header>
      <div className="header__inner">
        <nav className="nav">
          <a href="/#features" className="nav__link">Возможности</a>
          <a href="/#video" className="nav__link">Видеообзор</a>
          <a href="/#team" className="nav__link">Команда</a>
          <a href="/#games" className="nav__link">Игры</a>
        </nav>

        <div className="user__menu">
          {
            isLoggedIn
              ? <>
                <div className="user">
                  <div className="user__info">
                    <p>{name}</p>
                    <p>{email}</p>
                  </div>
                  <div className="user__icon">
                    <img src={avatar || avatarHolder} alt=""/>
                  </div>
                </div>
                <button className="user__logout" onClick={logout}>
                  <img src={logoutIcon} alt=""/>
                </button>
              </>
              : <Link className="btn" to="/auth">Вход / Регистрация</Link>
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
