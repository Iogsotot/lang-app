import { combineReducers } from 'redux';
import { wordListReducer } from './words';
import { gameDataReducer } from './gameData';
import { userReducer } from './user';
import { historyReducer } from './history';
import { themeReducer } from './theme';

export const rootReducer = combineReducers({
  wordList: wordListReducer,
  gameData: gameDataReducer,
  user: userReducer,
  history: historyReducer,
  theme: themeReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
