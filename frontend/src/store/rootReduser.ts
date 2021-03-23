import { combineReducers } from 'redux';
import { wordListReducer } from '../components/WordList/WordList.reducer';

export const rootReducer = combineReducers({
  wordList: wordListReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
