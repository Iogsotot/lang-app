import { WordListAction, WordListActionTypes, WordListState } from '../../models/word';

const {
  FETCH_RANDOM_WORD_LIST,
  FETCH_WORDS_API,
  FETCH_WORDS_API_ERROR,
  FETCH_WORD_LIST_SUCCESS,
  GET_WORD_LIST_PAGE,
  GET_WORD_LIST_GROUP,
  SHOW_WORD_TRANSLATE,
  SHOW_WORD_BUTTONS,
  FETCH_USER_WORD_LIST_SUCCESS,
  SET_WORDS,
  START_FETCH_WORD_UPDATE,
} = WordListActionTypes;

export const initialState: WordListState = {
  words: [],
  page: 1,
  group: 1,
  loading: false,
  hiddenLoading: false,
  error: null,
  translate: true,
  displayButtons: true,
};

export const wordListReducer = (state = initialState, action: WordListAction): WordListState => {
  switch (action.type) {
    case FETCH_WORDS_API:
      return { ...state, loading: true };

    case START_FETCH_WORD_UPDATE:
      return { ...state, hiddenLoading: true };

    case FETCH_RANDOM_WORD_LIST:
      return { ...state, loading: true };

    case GET_WORD_LIST_PAGE:
      return { ...state, page: action.payload };

    case GET_WORD_LIST_GROUP:
      return { ...state, group: action.payload };

    case FETCH_WORD_LIST_SUCCESS:
      return { ...state, loading: false, words: action.payload };

    case FETCH_USER_WORD_LIST_SUCCESS:
      return { ...state, groupOfWords: action.payload };

    case FETCH_WORDS_API_ERROR:
      return { ...state, loading: false, error: action.payload };

    case SHOW_WORD_TRANSLATE:
      return { ...state, translate: action.payload };

    case SHOW_WORD_BUTTONS:
      return { ...state, displayButtons: action.payload };

    case SET_WORDS:
      return { ...state, words: action.payload, hiddenLoading: false };

    default:
      return state;
  }
};
