import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import TextBook from './components/Textbook';
import PromoPage from './components/PromoPage';
import AuthPage from './components/AuthPage';
import { useTypedSelector } from './hooks/useTypedSelector';

export const Router: FC = () => {
  const { isLoggedIn } = useTypedSelector((store) => store.user);

  if (isLoggedIn) {
    return (
      <Switch>
        <Route path="/" exact>
          <PromoPage />
        </Route>

        <Route path="/textbook/:group/:page" exact>
          <TextBook />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <PromoPage />
      </Route>

      <Route path="/auth" exact>
        <AuthPage />
      </Route>

      <Route path="/textbook/:group/:page" exact>
        <TextBook />
      </Route>

      <Redirect to="/" />
    </Switch>
  );
};
