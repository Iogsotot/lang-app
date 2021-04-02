/* eslint-disable */
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
// import { initialState } from './reducers/words'

const preloadedState = localStorage.reduxState ? JSON.parse(localStorage.reduxState) : rootReducer;
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  // rootReducer,
  preloadedState,
  composeEnhancers(applyMiddleware(thunk)),
);

store.subscribe(() => localStorage.reduxState = JSON.stringify(store.getState()));

export default store;
