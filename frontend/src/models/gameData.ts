import { Word } from './word';

interface GetGroup {
  type: GameDataActionTypes.SET_GROUP;
  payload: number;
}
interface GetPage {
  type: GameDataActionTypes.SET_PAGE;
  payload: number;
}
interface DelFromActiveWordsAction {
  type: GameDataActionTypes.DEL_FROM_ACTIVE_WORDS_ACTION;
  payload: Word[];
}
interface AddToActiveWordsAction {
  type: GameDataActionTypes.ADD_TO_ACTIVE_WORDS_ACTION;
  payload: Word[];
}
interface DelFromHardWordsAction {
  type: GameDataActionTypes.DEL_FROM_DELETED_WORDS_ACTION;
  payload: Word[];
}
interface AddToHardWordsAction {
  type: GameDataActionTypes.ADD_TO_DELETED_WORDS_ACTION;
  payload: Word[];
}
interface DelFromDeletedWordsAction {
  type: GameDataActionTypes.DEL_FROM_HARD_WORDS_ACTION;
  payload: Word[];
}
interface AddToDeletedWordsAction {
  type: GameDataActionTypes.ADD_TO_HARD_WORDS_ACTION;
  payload: Word[];
}

export enum GameDataActionTypes {
  SET_GROUP = 'SET_GROUP',
  SET_PAGE = 'SET_PAGE',
  DEL_FROM_ACTIVE_WORDS_ACTION = 'DEL_FROM_ACTIVE_WORDS_ACTION',
  ADD_TO_ACTIVE_WORDS_ACTION = 'ADD_TO_ACTIVE_WORDS_ACTION',
  DEL_FROM_DELETED_WORDS_ACTION = 'DEL_FROM_DELETED_WORDS_ACTION',
  ADD_TO_DELETED_WORDS_ACTION = 'ADD_TO_DELETED_WORDS_ACTION',
  DEL_FROM_HARD_WORDS_ACTION = 'DEL_FROM_HARD_WORDS_ACTION',
  ADD_TO_HARD_WORDS_ACTION = 'ADD_TO_HARD_WORDS_ACTION',
}

export interface GameDataState {
  page: number,
  group: number,
  words: Word[],
  activeWords: Word[],
  deletedWords: Word[],
  hardWords: Word[],
  test: string,
}

export type GameDataAction =
  GetGroup
  | GetPage
  | DelFromActiveWordsAction
  | AddToActiveWordsAction
  | DelFromHardWordsAction
  | AddToHardWordsAction
  | DelFromDeletedWordsAction
  | AddToDeletedWordsAction;
