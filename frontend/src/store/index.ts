import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

export const index = createStore(rootReducer, applyMiddleware(thunk));
