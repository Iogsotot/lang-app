import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import TextBook from './components/Textbook';
import PromoPage from './components/PromoPage';
import AuthPage from './components/AuthPage';
import Savannah from './components/Games/Savannah';
import Audiocall from './components/Games/AudioCall';
import Sprint from './components/Games/Sprint';
import { useTypedSelector } from './hooks/useTypedSelector';
import Dictionary from './components/Dictionary';

export const Router: FC = () => {
  const { isLoggedIn } = useTypedSelector(store => store.user);

  if (isLoggedIn) {
    return (
      <Switch>
        <Route path="/" exact>
          <PromoPage />
        </Route>

        <Route path="/textbook/:group/:page" exact>
          <TextBook />
        </Route>

        <Route path="/dictionary/:section/:group/:page" exact>
          <Dictionary />
        </Route>

        <Route path="/savannah/" exact>
          <Savannah />
        </Route>

        <Route path="/sprint/" exact>
          <Sprint />
        </Route>

        <Route path="/audiocall/">
          <Audiocall />
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

      <Route path="/savannah/" exact>
        <Savannah />
      </Route>

      <Route path="/sprint/" exact>
        <Sprint />
      </Route>

      <Route path="/audiocall/">
        <Audiocall />
      </Route>

      <Route path="/textbook/:group/:page" exact>
        <TextBook />
      </Route>

      <Redirect to="/" />
    </Switch>
  );
};
