import './App.scss';
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import TextBook from './components/Textbook';
import PromoPage from './components/PromoPage';
import { index } from './store';
import Memory from './components/Games/Memory';

const App: React.FC = () => (
  <div className="App">
    <Provider store={index}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <PromoPage />
          </Route>

          <Route path="/textbook/:group/:page" exact>
            <TextBook />
          </Route>

          <Route path="/memorygame" exact>
            <Memory />
          </Route>

          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  </div>
);

export default App;
