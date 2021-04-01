import './App.scss';
import React, { FC } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import TextBook from './components/Textbook';
import PromoPage from './components/PromoPage';
import Savannah from './components/Games/Savannah';
import { store } from './store';

const App: FC = () => (
  <div className="App">
    <header className="App-header"></header>

    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <PromoPage />
          </Route>
          <Route path="/Savannah/">
            <Savannah />
          </Route>

          <Route path="/textbook/:group/:page" exact>
            <TextBook />
          </Route>

          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  </div>
);

export default App;
