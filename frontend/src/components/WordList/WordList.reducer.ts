import { Dispatch } from 'react';
import { WordListAction, WordListActionTypes, WordListState } from './types';

const {
  FETCH_WORD_LIST,
  FETCH_WORD_LIST_ERROR,
  FETCH_WORD_LIST_SUCCESS,
} = WordListActionTypes;

const initialState: WordListState = {
  words: [],
  loading: false,
  error: null,
};

export const wordListReducer = (state = initialState, action: WordListAction): WordListState => {
  switch (action.type) {
    case WordListActionTypes.FETCH_WORD_LIST:
      return { ...state, loading: true };

    case WordListActionTypes.FETCH_WORD_LIST_SUCCESS:
      return { ...state, loading: false, words: action.payload };

    case WordListActionTypes.FETCH_WORD_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const fetchWords = () => (async (dispatch: Dispatch<WordListAction>): Promise<void> => {
  dispatch({ type: FETCH_WORD_LIST });

  const response = await fetch('https://rslang-2020q3.herokuapp.com/words', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((data) => data.json())
    .catch((error) => {
      dispatch({ type: FETCH_WORD_LIST_ERROR, payload: error });
    });

  dispatch({ type: FETCH_WORD_LIST_SUCCESS, payload: response });
});
