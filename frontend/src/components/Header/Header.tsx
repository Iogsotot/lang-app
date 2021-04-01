import './header.scss';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useAction } from '../../hooks/useAction';

const Header: FC = () => {
  const { isLoggedIn } = useTypedSelector((store) => store.user);
  const { logout } = useAction();
  return (
    <header>
      <Link to="/textbook/0/0">TextBook page</Link>
      <br />
      {!isLoggedIn
        ? <Link to="/auth">Auth page</Link>
        : <button onClick={logout}>LogOut</button>
      }
    </header>
  );
};

export default Header;
