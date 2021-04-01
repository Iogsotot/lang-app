import './header.scss';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useAction } from '../../hooks/useAction';

const Header: FC = () => {
  const { isLoggedIn } = useTypedSelector((store) => store.user);
  const { logout } = useAction();

  const userMenu = () => {
    if (isLoggedIn) {
      return (<button onClick={logout}>LogOut</button>);
    }

    return <Link className="btn" to="/auth">Вход / Регистрация</Link>;
  };

  return (
    <header>
      <div className="header__inner">
        <nav className="nav">
          <a href="#features" className="nav__link">Возможности</a>
          <a href="#video" className="nav__link">Видеообзор</a>
          <a href="#team" className="nav__link">Команда</a>
          <a href="#games" className="nav__link">Игры</a>
        </nav>

        <div className="user__menu">
          {userMenu()}
        </div>
      </div>
    </header>
  );
};

export default Header;
