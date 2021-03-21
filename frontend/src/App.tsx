import { FC } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Sprint from './components/Games/Sprint';
import './App.scss';

function basicGameMenu() {
  return (
    <div className="navbar-menu">
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link">Games</a>
        <div className="navbar-dropdown">
          <Link className="navbar-item" to="/sprint">
            Sprint
          </Link>
          <Link className="navbar-item" to="/savannah">
            Savannah
          </Link>
          <Link className="navbar-item" to="/audiocall">
            AudioCall
          </Link>
        </div>
      </div>
    </div>
  );
}

const App: FC = () => (
  <div className="App">
    {/* <header className="App-header">
      </header> */}
    <Switch>
      <Route exact path="/" component={basicGameMenu}></Route>
      <Route exact path="/sprint" render={() => <Sprint />}></Route>
      <Route exact path="/savannah" render={() => <h2>savannah, not implemented</h2>}></Route>
      <Route exact path="/audiocall" render={() => <h2>audiocall, not implemented</h2>}></Route>
    </Switch>
  </div>
);
export default App;
