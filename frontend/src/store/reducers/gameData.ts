import { GameDataAction, GameDataActionTypes, GameDataState } from '../../models/gameData';

const {
  SET_GROUP,
  SET_PAGE,
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
    case SET_GROUP:
      return { ...state, group: action.payload };
    case SET_PAGE:
      return { ...state, page: action.payload };
    case DEL_FROM_ACTIVE_WORDS_ACTION:
      return { ...state, activeWords: action.payload };
    case ADD_TO_ACTIVE_WORDS_ACTION:
      return { ...state, activeWords: action.payload };
    case DEL_FROM_DELETED_WORDS_ACTION:
      return { ...state, deletedWords: action.payload };
    case ADD_TO_DELETED_WORDS_ACTION:
      return { ...state, deletedWords: action.payload };
    case DEL_FROM_HARD_WORDS_ACTION:
      return { ...state, hardWords: action.payload };
    case ADD_TO_HARD_WORDS_ACTION:
      return { ...state, hardWords: action.payload };

    default:
      return state;
  }
};
