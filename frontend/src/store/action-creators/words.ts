import { Dispatch } from 'react';
import { API_BASE_URL, USER_WORDS_FILTERS } from '../../constants';
import {
  WordListAction,
  WordListActionTypes,
  FetchUserWordsProps,
  DictionarySections,
  Word,
} from '../../models';

const {
  FETCH_WORD_LIST,
  FETCH_WORD_LIST_ERROR,
  FETCH_WORD_LIST_SUCCESS,
  FETCH_USER_WORD_LIST_SUCCESS,
  GET_WORD_LIST_PAGE,
  GET_WORD_LIST_GROUP,
  SHOW_WORD_TRANSLATE,
  SHOW_WORD_BUTTONS,
  SET_WORDS,
} = WordListActionTypes;

const {
  deletedWords,
  hardWords,
  learningWords,
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
  group, page, section, token, userId, amount, hideDeleted,
}: FetchUserWordsProps) => async (
  dispatch: Dispatch<WordListAction>,
): Promise<void> => {
  dispatch({
    type: FETCH_WORD_LIST,
  });

  let filter: string;

  switch (section) {
    case LEARNING: filter = learningWords;
      break;
    case HARD: filter = hardWords;
      break;
    case DELETED: filter = deletedWords;
      break;
    default: filter = '';
      break;
  }
  const groupFilter = group === 0 || group ? `group=${group}` : '';
  const pageFilter = page === 0 || page ? `&page=${page}` : '';
  const aggregationFilter = filter ? `&filter=${filter}` : '';
  const wordsPerPage = amount ? `&wordsPerPage=${amount}` : '';
  const queries = `${groupFilter}${pageFilter}${aggregationFilter}${wordsPerPage}`;
  const response = await fetch(
    `${API_BASE_URL}/users/${userId}/aggregatedWords?${queries}`,
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

  const groupedWords = (): Word[][] => {
    let words: Word[] = [];
    if (response && response[0]?.paginatedResults) {
      words = response[0].paginatedResults;
      const newWords = [];
      let wordsPage = [];

      for (let i = 0; i < words.length; i++) {
        if (hideDeleted) {
          if (words[i]?.userWord?.isDeleted !== true) {
            wordsPage.push(words[i]);
          }
        } else {
          wordsPage.push(words[i]);
        }
        if (wordsPage.length === 20 || i === words.length - 1) {
          newWords.push(wordsPage);
          wordsPage = [];
        }
      }
      return newWords;
    }
    return [];
  };
  const result = groupedWords();

  dispatch({
    type: FETCH_USER_WORD_LIST_SUCCESS,
    payload: result,
  });

  setTimeout(() => {
    if (result.length && result.some(Array.isArray)) {
      dispatch({
        type: FETCH_WORD_LIST_SUCCESS,
        payload: result[0],
      });
    } else {
      dispatch({
        type: FETCH_WORD_LIST_SUCCESS,
        payload: [],
      });
    }
  }, 1000);
};

export const fetchWords = (group: number, page: number, sort = 0) => async (
  dispatch: Dispatch<WordListAction>,
): Promise<void> => {
  dispatch({
    type: FETCH_WORD_LIST,
  });
  let fetchWordsUrl = `${API_BASE_URL}/words?group=${group}&page=${page}`;
  if (sort) {
    fetchWordsUrl += `&sort=${sort}`;
  }
  const response = await fetch(fetchWordsUrl, {
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

export const setLocalPage = (words: Word[] = []) => (dispatch: Dispatch<WordListAction>): void => {
  dispatch({
    type: SET_WORDS,
    payload: words,
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

export const updateWord = (words: Word[], word: Word) => (dispatch: Dispatch<WordListAction>) :void => {
  const updatedWords = words.map((newWord) => {
    if (newWord.word === word.word) {
      return { ...newWord, userWord: word.userWord };
    }
    return newWord;
  });
  dispatch({
    type: SET_WORDS,
    payload: updatedWords,
  });
};

export const clearDeletedWords = (words: Word[]) => (dispatch: Dispatch<WordListAction>) :void => {
  const clearedWords = words.filter((word) => word.userWord?.isDeleted !== true);
  dispatch({
    type: SET_WORDS,
    payload: clearedWords,
  });
};
