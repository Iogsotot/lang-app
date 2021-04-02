import { combineReducers } from 'redux';
import { wordListReducer } from './words';
import { gameDataReducer } from './gameData';

export const rootReducer = combineReducers({
  wordList: wordListReducer,
  gameData: gameDataReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
