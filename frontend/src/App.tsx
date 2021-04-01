import './App.scss';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Router } from './routes';
import Header from './components/Header';

const App: React.FC = () => (
  <div className="App">
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </Provider>
  </div>
);

export default App;
