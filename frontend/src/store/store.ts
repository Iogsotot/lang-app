/* eslint-disable */
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

const initialState = {
  WordListState: {
    words: [],
    page: 0,
    group: 0,
    loading: false,
    error: null,
    translate: true,
    displayButtons: true,
  },
  GameDataState: {
    words: [],
    page: 0,
    group: 0,
    activeWords: [],
    deletedWords: [],
    hardWords: [],
    test: 'hi!',
  }
}

const preloadedState = localStorage.reduxState ? JSON.parse(localStorage.reduxState) : initialState;
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(applyMiddleware(thunk)),
);

store.subscribe(() => localStorage.reduxState = JSON.stringify(store.getState()));

export default store;
