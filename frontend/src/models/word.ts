import { Dispatch } from 'react';

interface UserWord {
  isDeleted?: boolean;
  isLearning?: boolean;
  difficulty?: string;
}

export interface Word {
  id?: string;
  group?: number;
  page?: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  userWord?: UserWord;
}

export interface WordListState {
  words: Word[];
  groupOfWords?: Word[][];
  page: number;
  group: number;
  loading: boolean;
  hiddenLoading: boolean;
  error: null | string;
  translate: boolean;
  displayButtons: boolean;
}

export interface FetchUserWordsProps {
  group: number;
  page?: number;
  section?: string;
  amount?: number;
  hideDeleted?: boolean;
  userId: string;
  token: string;
}

export interface WordsDispatchProps {
  fetchRandomWords: (
    group: number,
    page: number,
    amount: number,
  ) => (dispatch: Dispatch<WordListAction>) => Promise<void>;
  showButtons: (show: boolean) => (dispatch: Dispatch<WordListAction>) => void;
  setGroup: (number: number) => (dispatch: Dispatch<WordListAction>) => void;
  fetchWords: (group: number, page: number, sort?: number) => (dispatch: Dispatch<WordListAction>) => Promise<void>;
  fetchUserWords: (props: FetchUserWordsProps) => (dispatch: Dispatch<WordListAction>) => Promise<void>;
  showTranslate: (show: boolean) => (dispatch: Dispatch<WordListAction>) => void;
  setPage: (number: number) => (dispatch: Dispatch<WordListAction>) => void;
  setLocalPage: (page: Word[]) => (dispatch: Dispatch<WordListAction>) => void;
  updateWord: (
    words: Word[],
    word: Word,
    token: string,
    userId: string,
    newId: string,
    body: string,
    method?: string,
  ) => (dispatch: Dispatch<WordListAction>) => void;
  clearDeletedWords: (words: Word[]) => (dispatch: Dispatch<WordListAction>) => void;
}

interface FetchRandomWordListAction {
  type: WordListActionTypes.FETCH_RANDOM_WORD_LIST;
}

interface FetchWordListAction {
  type: WordListActionTypes.FETCH_WORDS_API;
}

interface FetchWordUpdateAction {
  type: WordListActionTypes.START_FETCH_WORD_UPDATE;
}
interface FetchWordListSuccessAction {
  type: WordListActionTypes.FETCH_WORD_LIST_SUCCESS;
  payload: Word[];
}

interface FetchUserWordListSuccessAction {
  type: WordListActionTypes.FETCH_USER_WORD_LIST_SUCCESS;
  payload: Word[][];
}

interface FetchWordListErrorAction {
  type: WordListActionTypes.FETCH_WORDS_API_ERROR;
  payload: string;
}

interface GetWordListPage {
  type: WordListActionTypes.GET_WORD_LIST_PAGE;
  payload: number;
}

interface ShowWordTranslate {
  type: WordListActionTypes.SHOW_WORD_TRANSLATE;
  payload: boolean;
}

interface ShowWordButtons {
  type: WordListActionTypes.SHOW_WORD_BUTTONS;
  payload: boolean;
}

interface GetWordListGroup {
  type: WordListActionTypes.GET_WORD_LIST_GROUP;
  payload: number;
}

interface UpdateWord {
  type: WordListActionTypes.SET_WORDS;
  payload: Word[];
}

export enum DictionarySections {
  LEARNING = 'learning',
  HARD = 'hard',
  DELETED = 'deleted',
}

export enum WordListActionTypes {
  FETCH_RANDOM_WORD_LIST = 'FETCH_RANDOM_WORD_LIST',
  FETCH_WORDS_API = 'FETCH_WORDS_API',
  FETCH_WORD_LIST_SUCCESS = 'FETCH_WORD_LIST_SUCCESS',
  FETCH_USER_WORD_LIST_SUCCESS = 'FETCH_USER_WORD_LIST_SUCCESS',
  FETCH_WORDS_API_ERROR = 'FETCH_WORDS_API_ERROR',
  GET_WORD_LIST_PAGE = 'GET_WORD_LIST_PAGE',
  GET_WORD_LIST_GROUP = 'GET_WORD_LIST_GROUP',
  SHOW_WORD_TRANSLATE = 'SHOW_WORD_TRANSLATE',
  SHOW_WORD_BUTTONS = 'SHOW_WORD_BUTTONS',
  SET_WORDS = 'SET_WORDS',
  START_FETCH_WORD_UPDATE = 'START_FETCH_WORD_UPDATE',
}

export type WordListAction =
  | FetchRandomWordListAction
  | FetchWordListAction
  | FetchWordListSuccessAction
  | FetchUserWordListSuccessAction
  | FetchWordListErrorAction
  | GetWordListPage
  | GetWordListGroup
  | ShowWordTranslate
  | ShowWordButtons
  | UpdateWord
  | FetchWordUpdateAction;
