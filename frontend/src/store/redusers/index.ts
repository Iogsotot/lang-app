import { combineReducers } from 'redux';
import { wordListReducer } from './words';

export const rootReducer = combineReducers({
  wordList: wordListReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
