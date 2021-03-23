import { Word } from '../../models/word';

export interface WordListState {
  words: Word[];
  loading: boolean;
  error: null | string;
}

interface FetchWordListAction {
  type: WordListActionTypes.FETCH_WORD_LIST;
}

interface FetchWordListSuccessAction {
  type: WordListActionTypes.FETCH_WORD_LIST_SUCCESS;
  payload: Word[];
}

interface FetchWordListErrorAction {
  type: WordListActionTypes.FETCH_WORD_LIST_ERROR;
  payload: string;
}

export enum WordListActionTypes {
  FETCH_WORD_LIST = 'FETCH_WORD_LIST',
  FETCH_WORD_LIST_SUCCESS = 'FETCH_WORD_LIST_SUCCESS',
  FETCH_WORD_LIST_ERROR = 'FETCH_WORD_LIST_ERROR',
}

export type WordListAction = FetchWordListAction | FetchWordListSuccessAction | FetchWordListErrorAction;
