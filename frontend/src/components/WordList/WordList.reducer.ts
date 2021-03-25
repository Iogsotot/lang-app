import { Dispatch } from 'react';
import { WordListAction, WordListActionTypes, WordListState } from './types';
import { API } from '../../constants/constants';

const {
  FETCH_WORD_LIST,
  FETCH_WORD_LIST_ERROR,
  FETCH_WORD_LIST_SUCCESS,
  GET_WORD_LIST_PAGE,
  GET_WORD_LIST_GROUP,
  SHOW_WORD_TRANSLATE,
  SHOW_WORD_BUTTONS,
} = WordListActionTypes;

const initialState: WordListState = {
  words: [],
  page: 0,
  group: 0,
  loading: false,
  error: null,
  translate: true,
  displayButtons: true,
};

export const wordListReducer = (state = initialState, action: WordListAction): WordListState => {
  switch (action.type) {
    case FETCH_WORD_LIST:
      return { ...state, loading: true };

    case GET_WORD_LIST_PAGE:
      return { ...state, page: action.payload };

    case GET_WORD_LIST_GROUP:
      return { ...state, group: action.payload };

    case FETCH_WORD_LIST_SUCCESS:
      return { ...state, loading: false, words: action.payload };

    case FETCH_WORD_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    case SHOW_WORD_TRANSLATE:
      return { ...state, translate: action.payload };

    case SHOW_WORD_BUTTONS:
      return { ...state, displayButtons: action.payload };

    default:
      return state;
  }
};

export const fetchWords = (group: number, page: number) =>
  (async (dispatch: Dispatch<WordListAction>): Promise<void> => {
    dispatch({ type: FETCH_WORD_LIST });

    const response = await fetch(
      `${API.main}/words?group=${group}&page=${page}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then((data) => data.json())
      .catch((error) => {
        dispatch({ type: FETCH_WORD_LIST_ERROR, payload: error });
      });

    dispatch({ type: FETCH_WORD_LIST_SUCCESS, payload: response });
  });

export const setPage = (number: number) =>
  ((dispatch: Dispatch<WordListAction>): void => {
    dispatch({ type: GET_WORD_LIST_PAGE, payload: number });
  });

export const setGroup = (number: number) =>
  ((dispatch: Dispatch<WordListAction>): void => {
    dispatch({ type: GET_WORD_LIST_GROUP, payload: number });
  });

export const showTranslate = (show: boolean) =>
  ((dispatch: Dispatch<WordListAction>): void => {
    dispatch({ type: SHOW_WORD_TRANSLATE, payload: show });
  });

export const showButtons = (show: boolean) =>
  ((dispatch: Dispatch<WordListAction>): void => {
    dispatch({ type: SHOW_WORD_BUTTONS, payload: show });
  });
