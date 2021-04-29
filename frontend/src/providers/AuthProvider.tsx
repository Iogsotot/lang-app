import { FC, useEffect } from 'react';
import { useAction } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';

const AuthProvider: FC = ({ children }) => {
  const store = useTypedSelector(commonStore => commonStore);
  const { user, isLoggedIn } = store.user;
  const { updateToken } = useAction();

  useEffect(() => {
    if (isLoggedIn) {
      const { token } = store.user.user;
      const { exp } = JSON.parse(atob(token.split('.')[1]));
      const second = 1000;
      if (Date.now() > (exp * second)) {
        updateToken(user);
      }
    }
  }, [store]);

  return <>{ children }</>;
};

export default AuthProvider;
