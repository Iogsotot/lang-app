import { combineReducers } from 'redux';
import { wordListReducer } from './words';
import { gameDataReducer } from './gameData';
import { userReducer } from './user';
import { historyReducer } from './history';

export const rootReducer = combineReducers({
  wordList: wordListReducer,
  gameData: gameDataReducer,
  user: userReducer,
  history: historyReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
