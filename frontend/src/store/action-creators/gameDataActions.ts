import { Dispatch } from 'react';
import { GameDataAction, GameDataActionTypes } from '../../models/gameData';
import { Word } from '../../models/word';

const {
  SET_GROUP,
  SET_PAGE,
  DEL_FROM_ACTIVE_WORDS_ACTION,
  ADD_TO_ACTIVE_WORDS_ACTION,
  DEL_FROM_DELETED_WORDS_ACTION,
  ADD_TO_DELETED_WORDS_ACTION,
  DEL_FROM_HARD_WORDS_ACTION,
  ADD_TO_HARD_WORDS_ACTION,
} = GameDataActionTypes;

export default {
  setPage: (number: number) =>
    ((dispatch: Dispatch<GameDataAction>): void => {
      dispatch({
        type: SET_PAGE,
        payload: number,
      });
    }),

  setGroup: (number: number) =>
    ((dispatch: Dispatch<GameDataAction>): void => {
      dispatch({
        type: SET_GROUP,
        payload: number,
      });
    }),

  delFromActiveWords: () =>
    ((dispatch: Dispatch<GameDataAction>, getState: () => any): void => {
      // const { activeWords } = getState();
      // const newActiveWords: Word[] = activeWords.slice(0, -1);

      dispatch({
        type: DEL_FROM_ACTIVE_WORDS_ACTION,
        payload: [],
      });
    }),

  addToActiveWords: (word: Word) =>
    ((dispatch: Dispatch<GameDataAction>, getState: () => any): void => {
      const { gameData } = getState();
      const { activeWords } = gameData;
      dispatch({
        type: ADD_TO_ACTIVE_WORDS_ACTION,
        payload: [...activeWords, word],
      });
    }),

  delFromDeletedWords: () =>
    ((dispatch: Dispatch<GameDataAction>, getState: () => any): void => {
      // const { gameData } = getState();
      // const { activeWords } = gameData;
      dispatch({
        type: DEL_FROM_DELETED_WORDS_ACTION,
        payload: [],
      });
    }),

  addToDeletedWords: (word: Word) =>
    ((dispatch: Dispatch<GameDataAction>, getState: () => any): void => {
      const { gameData } = getState();
      const { deletedWords } = gameData;
      dispatch({
        type: ADD_TO_DELETED_WORDS_ACTION,
        payload: [...deletedWords, word],
      });
    }),

  delFromHarddWords: () =>
    ((dispatch: Dispatch<GameDataAction>, getState: () => any): void => {
    // const { gameData } = getState();
    // const { deletedWords } = gameData;
      dispatch({
        type: DEL_FROM_HARD_WORDS_ACTION,
        payload: [],
      });
    }),

  addToHardWords: (word: Word) =>
    ((dispatch: Dispatch<GameDataAction>, getState: () => any): void => {
      const { gameData } = getState();
      const { hardWords } = gameData;
      dispatch({
        type: ADD_TO_HARD_WORDS_ACTION,
        payload: [...hardWords, word],
      });
    }),
};
