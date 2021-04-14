import { FC } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';

const DarkThemeProvider: FC = ({ children }) => {
  const { darkMode } = useTypedSelector(store => store.theme);
  return (
    <div className={darkMode === true ? 'App dark-mode' : 'App light-mode'}>
      {children}
    </div>
  );
};

export default DarkThemeProvider;
