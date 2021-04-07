import { Dispatch } from 'react';
import { API_BASE_URL, USER_WORDS_FILTERS } from '../../constants';
import {
  WordListAction,
  WordListActionTypes,
  FetchUserWordsProps,
  DictionarySections,
} from '../../models';

const {
  FETCH_WORD_LIST,
  FETCH_WORD_LIST_ERROR,
  FETCH_WORD_LIST_SUCCESS,
  GET_WORD_LIST_PAGE,
  GET_WORD_LIST_GROUP,
  SHOW_WORD_TRANSLATE,
  SHOW_WORD_BUTTONS,
} = WordListActionTypes;

const {
  deletedWords,
} = USER_WORDS_FILTERS;

const {
  LEARNING,
  HARD,
  DELETED,
} = DictionarySections;

export const fetchRandomWords = (group: number, amount: number) => async (
  dispatch: Dispatch<WordListAction>,
): Promise<void> => {
  dispatch({ type: FETCH_WORD_LIST });

  const response = await fetch(`${API_BASE_URL}/words/all?group=${group}&amount=${amount}`, {
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

export const fetchUserWords = ({
  group, page, section, token, userId,
}: FetchUserWordsProps) => async (
  dispatch: Dispatch<WordListAction>,
): Promise<void> => {
  dispatch({
    type: FETCH_WORD_LIST,
  });

  let filter: string;

  switch (section) {
    case LEARNING: filter = LEARNING;
      break;
    case HARD: filter = HARD;
      break;
    case DELETED: filter = deletedWords;
      break;
    default: filter = '';
      break;
  }

  const amount = 600;
  const aggregationFilter = filter ? `&filter=${filter}` : '';
  const queries = `?group=${group}&page=${page}${aggregationFilter}&wordsPerPage=${amount}`;

  const response = await fetch(
    `${API_BASE_URL}/users/${userId}/aggregatedWords${queries}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
    .then(data => data.json())
    .catch(error => {
      dispatch({
        type: FETCH_WORD_LIST_ERROR,
        payload: error,
      });
    });

  dispatch({
    type: FETCH_WORD_LIST_SUCCESS,
    payload: response[0].paginatedResults,
  });
};

export const fetchWords = (group: number, page: number) => async (
  dispatch: Dispatch<WordListAction>,
): Promise<void> => {
  dispatch({
    type: FETCH_WORD_LIST,
  });

  const response = await fetch(`${API_BASE_URL}/words?group=${group}&page=${page}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(data => data.json())
    .catch(error => {
      dispatch({
        type: FETCH_WORD_LIST_ERROR,
        payload: error,
      });
    });

  dispatch({
    type: FETCH_WORD_LIST_SUCCESS,
    payload: response,
  });
};

export const setPage = (number: number) => (dispatch: Dispatch<WordListAction>): void => {
  dispatch({
    type: GET_WORD_LIST_PAGE,
    payload: number,
  });
};

export const setGroup = (number: number) => (dispatch: Dispatch<WordListAction>): void => {
  dispatch({
    type: GET_WORD_LIST_GROUP,
    payload: number,
  });
};

export const showTranslate = (show: boolean) => (dispatch: Dispatch<WordListAction>): void => {
  dispatch({
    type: SHOW_WORD_TRANSLATE,
    payload: show,
  });
};

export const showButtons = (show: boolean) => (dispatch: Dispatch<WordListAction>): void => {
  dispatch({
    type: SHOW_WORD_BUTTONS,
    payload: show,
  });
};
