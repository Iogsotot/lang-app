import './App.scss';
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import TextBook from './components/Textbook/index';
import PromoPage from './components/PromoPage/index';
import { store } from './store/store';

const App: React.FC = () => (
  <div className="App">
    <Provider store={store}>
      <BrowserRouter>
        <Switch>

          <Route path="/" exact>
            <PromoPage />
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
