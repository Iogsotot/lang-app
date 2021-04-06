import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import store from './store/store';
import 'typeface-roboto';
import 'typeface-roboto-mono';
import 'typeface-rubik';
import Menu from './components/Menu';
import Puzzle from './components/Games/Puzzle';
import { Router } from './routes';

const App: FC = () => (
  <div className="App">
    <Provider store={store}>
      <BrowserRouter>

        <Menu />

<<<<<<< HEAD
        <Header />

        <Router />

        <Footer />
      </BrowserRouter>
    </Provider>
=======
          <Route path="/memorygame" exact>
            <Memory />
          </Route>

          <Redirect to="/" />
        </Switch>
      </Provider>
      <Footer />
    </BrowserRouter>
>>>>>>> 4e436a6f2cf112250f79ed6570ad5302b21b4604
  </div>
);

export default App;
