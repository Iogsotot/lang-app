import { GameDataAction, GameDataActionTypes, GameDataState } from '../../models/gameData';

const {
  GET_GROUP,
  GET_PAGE,
  DEL_FROM_ACTIVE_WORDS_ACTION,
  ADD_TO_ACTIVE_WORDS_ACTION,
  DEL_FROM_DELETED_WORDS_ACTION,
  ADD_TO_DELETED_WORDS_ACTION,
  DEL_FROM_HARD_WORDS_ACTION,
  ADD_TO_HARD_WORDS_ACTION,
} = GameDataActionTypes;

const initialState: GameDataState = {
  words: [],
  page: 0,
  group: 0,
  activeWords: [],
  deletedWords: [],
  hardWords: [],
  test: 'hi!',
};

export const gameDataReducer = (state = initialState, action: GameDataAction): GameDataState => {
  switch (action.type) {
    case GET_GROUP:
      return state;
    case GET_PAGE:
      return state;
    case DEL_FROM_ACTIVE_WORDS_ACTION:
      return state;
    case ADD_TO_ACTIVE_WORDS_ACTION:
      return state;
    case DEL_FROM_DELETED_WORDS_ACTION:
      return state;
    case ADD_TO_DELETED_WORDS_ACTION:
      return state;
    case DEL_FROM_HARD_WORDS_ACTION:
      return state;
    case ADD_TO_HARD_WORDS_ACTION:
      return state;

    default:
      return state;
  }
};
