import './App.scss';
import React, { FC } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import TextBook from './components/Textbook';
import PromoPage from './components/PromoPage';
import Savannah from './components/Games/Savannah';
import Header from './components/Header';
import Footer from './components/Footer';
import { store } from './store';
// import font from './assets/fonts'
import Menu from './components/Menu';

const App: FC = () => (
  <div className="App">
    <BrowserRouter>
      <Menu />
      <Header />
      <Provider store={store}>
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

          <Route path="/memorygame" exact>
            <Memory />
          </Route>

          <Redirect to="/" />
        </Switch>
      </Provider>
      <Footer />
    </BrowserRouter>
  </div>
);

export default App;
