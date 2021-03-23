import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './rootReduser';

export const store = createStore(rootReducer, applyMiddleware(thunk));
