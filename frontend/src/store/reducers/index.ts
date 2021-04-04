import { combineReducers } from 'redux';
import { wordListReducer } from './words';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  wordList: wordListReducer,
  user: userReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
