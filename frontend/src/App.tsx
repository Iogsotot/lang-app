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
import { Router } from './routes';

const App: FC = () => (
  <div className="App">
    <Provider store={store}>
      <BrowserRouter>
        <Menu />

        <Header />

        <Router />

        <Footer />
      </BrowserRouter>
    </Provider>
  </div>
);

export default App;
