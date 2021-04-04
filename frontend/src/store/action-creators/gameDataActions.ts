import { Dispatch } from 'react';
import { GameDataAction, GameDataActionTypes } from '../../models/gameData';
import { Word } from '../../models/word';
import { API_BASE_URL } from '../../constants';

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

  delFromActiveWords: (word: Word) =>
    ((dispatch: Dispatch<GameDataAction>, getState: () => any): void => {
      const { gameData } = getState();
      const { activeWords } = gameData;
      const result = activeWords.filter((item: Word) => item.id !== word.id);
      dispatch({
        type: DEL_FROM_ACTIVE_WORDS_ACTION,
        payload: result,
      });
    }),

  addToActiveWords: (word: Word) =>
    (async (dispatch: Dispatch<GameDataAction>, getState: () => any): Promise<void> => {
      const { gameData, user } = getState();
      const { activeWords } = gameData;
      const { user: userData } = user;
      if (!activeWords.find((item: Word) => word.id === item.id)) {
        dispatch({
          type: ADD_TO_ACTIVE_WORDS_ACTION,
          payload: [...activeWords, word],
        });
        await fetch(
          `${API_BASE_URL}/${userData.userId}/words/${word.id}`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userData.token}`,
            },
            body: JSON.stringify({
              isLearning: true,
              learningStartDate: Date.now(),
            }),
          },
        )
          .then((data) => data.json());
      }
    }),

  delFromDeletedWords: (word: Word) =>
    ((dispatch: Dispatch<GameDataAction>, getState: () => any): void => {
      const { gameData } = getState();
      const { deletedWords } = gameData;
      const result = deletedWords.filter((item: Word) => item.id !== word.id);
      dispatch({
        type: DEL_FROM_DELETED_WORDS_ACTION,
        payload: result,
      });
    }),

  addToDeletedWords: (word: Word) =>
    ((dispatch: Dispatch<GameDataAction>, getState: () => any): void => {
      const { gameData } = getState();
      const { deletedWords } = gameData;
      if (!deletedWords.find((item: Word) => word.id === item.id)) {
        dispatch({
          type: ADD_TO_DELETED_WORDS_ACTION,
          payload: [...deletedWords, word],
        });
      }
    }),

  delFromHarddWords: (word: Word) =>
    ((dispatch: Dispatch<GameDataAction>, getState: () => any): void => {
      const { gameData } = getState();
      const { hardWords } = gameData;
      const result = hardWords.filter((item: Word) => item.id !== word.id);
      dispatch({
        type: DEL_FROM_HARD_WORDS_ACTION,
        payload: result,
      });
    }),

  addToHardWords: (word: Word) =>
    ((dispatch: Dispatch<GameDataAction>, getState: () => any): void => {
      const { gameData } = getState();
      const { hardWords } = gameData;
      if (!hardWords.find((item: Word) => word.id === item.id)) {
        dispatch({
          type: ADD_TO_HARD_WORDS_ACTION,
          payload: [...hardWords, word],
        });
      }
    }),
};
