import { Dispatch } from 'react';
import { WordListAction, WordListActionTypes, WordListState } from './types';

const {
  FETCH_WORD_LIST,
  FETCH_WORD_LIST_ERROR,
  FETCH_WORD_LIST_SUCCESS,
  GET_WORD_LIST_PAGE,
  GET_WORD_LIST_GROUP,
} = WordListActionTypes;

const initialState: WordListState = {
  words: [],
  page: 0,
  group: 0,
  loading: false,
  error: null,
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

    default:
      return state;
  }
};

export const fetchWords = (group: number, page: number) =>
  (async (dispatch: Dispatch<WordListAction>): Promise<void> => {
    dispatch({ type: FETCH_WORD_LIST });

    const response = await fetch(
      `https://rslang-2020q3.herokuapp.com/words?group=${group}&page=${page}`,
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

export const changePage = (number: number) =>
  ((dispatch: Dispatch<WordListAction>): void => {
    dispatch({ type: GET_WORD_LIST_PAGE, payload: number });
  });
export const changeGroup = (number: number) =>
  ((dispatch: Dispatch<WordListAction>): void => {
    dispatch({ type: GET_WORD_LIST_GROUP, payload: number });
  });
