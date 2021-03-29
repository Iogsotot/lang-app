import { FC } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Sprint from './components/Games/Sprint';
import './App.scss';

import TextBook from './components/Textbook';
import PromoPage from './components/PromoPage';
import { index } from './store';

const App: FC = () => (
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
          <Route exact path="/sprint" render={() => <Sprint />}></Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  </div>
);

export default App;
