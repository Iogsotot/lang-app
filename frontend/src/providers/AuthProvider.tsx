import { FC, useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';

const AuthProvider: FC = ({ children }) => {
  const store = useTypedSelector(commonStore => commonStore);

  useEffect(() => {
    const { token } = store.user.user;
    const { exp } = JSON.parse(atob(token.split('.')[1]));
    const second = 1000;
    if (Date.now() > (exp * second)) {
      console.log('expired');
    }
  }, [store]);

  return <>{ children }</>;
};

export default AuthProvider;
