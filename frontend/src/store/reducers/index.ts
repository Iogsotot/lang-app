import { combineReducers } from 'redux';
import { wordListReducer } from './words';
import { gameDataReducer } from './gameData';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  wordList: wordListReducer,
  gameData: gameDataReducer,
  user: userReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
