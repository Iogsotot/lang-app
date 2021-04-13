import { FC } from 'react';
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
import DarkThemeProvider from './components/Theme';

const App: FC = () => (
    <Provider store={store}>
      <DarkThemeProvider>
        <BrowserRouter>
          <Menu />
          <Header />
          <Router />
          <Footer />
        </BrowserRouter>
      </DarkThemeProvider>
    </Provider>
);

export default App;
