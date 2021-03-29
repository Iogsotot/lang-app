import { Dispatch } from 'react';
import { constants } from '../../constants';
import { WordListAction, WordListActionTypes } from '../../models/word';

const { API_BASE_URL } = constants;

const {
  FETCH_WORD_LIST,
  FETCH_WORD_LIST_ERROR,
  FETCH_WORD_LIST_SUCCESS,
  GET_WORD_LIST_PAGE,
  GET_WORD_LIST_GROUP,
  SHOW_WORD_TRANSLATE,
  SHOW_WORD_BUTTONS,
} = WordListActionTypes;

export const fetchWords = (group: number, page: number) => async (
  dispatch: Dispatch<WordListAction>,
): Promise<void> => {
  dispatch({ type: FETCH_WORD_LIST });

  const response = await fetch(`${API_BASE_URL}/words?group=${group}&page=${page}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(data => data.json())
    .catch(error => {
      dispatch({ type: FETCH_WORD_LIST_ERROR, payload: error });
    });

  dispatch({ type: FETCH_WORD_LIST_SUCCESS, payload: response });
};

export const setPage = (number: number) => (dispatch: Dispatch<WordListAction>): void => {
  dispatch({ type: GET_WORD_LIST_PAGE, payload: number });
};

export const setGroup = (number: number) => (dispatch: Dispatch<WordListAction>): void => {
  dispatch({ type: GET_WORD_LIST_GROUP, payload: number });
};

export const showTranslate = (show: boolean) => (dispatch: Dispatch<WordListAction>): void => {
  dispatch({ type: SHOW_WORD_TRANSLATE, payload: show });
};

export const showButtons = (show: boolean) => (dispatch: Dispatch<WordListAction>): void => {
  dispatch({ type: SHOW_WORD_BUTTONS, payload: show });
};
