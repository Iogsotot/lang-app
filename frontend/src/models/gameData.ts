import { Word } from './word';

interface GetGroup {
  type: GameDataActionTypes.GET_GROUP;
  payload: number;
}
interface GetPage {
  type: GameDataActionTypes.GET_PAGE;
  payload: number;
}
interface DelFromActiveWordsAction {
  type: GameDataActionTypes.DEL_FROM_ACTIVE_WORDS_ACTION;
}
interface AddToActiveWordsAction {
  type: GameDataActionTypes.ADD_TO_ACTIVE_WORDS_ACTION;
}
interface DelFromHardWordsAction {
  type: GameDataActionTypes.DEL_FROM_DELETED_WORDS_ACTION;
}
interface AddToHardWordsAction {
  type: GameDataActionTypes.ADD_TO_DELETED_WORDS_ACTION;
}
interface DelFromDeletedWordsAction {
  type: GameDataActionTypes.DEL_FROM_HARD_WORDS_ACTION;
}
interface AddToDeletedWordsAction {
  type: GameDataActionTypes.ADD_TO_HARD_WORDS_ACTION;
}

export enum GameDataActionTypes {
  GET_GROUP = 'GET_GROUP',
  GET_PAGE = 'GET_PAGE',
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
