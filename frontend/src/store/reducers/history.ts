import { HistoryAction, HistoryActionTypes, HistoryState } from '../../models';

const {
  PUSH_TO_HISTORY,
  CLEAR_HISTORY,
} = HistoryActionTypes;

const initialState: HistoryState = {
  history: [],
};

export const historyReducer = (state = initialState, action: HistoryAction): HistoryState => {
  switch (action.type) {
    case PUSH_TO_HISTORY:
      return { ...state, history: action.payload };
    case CLEAR_HISTORY:
      return { ...state, history: action.payload };

    default:
      return state;
  }
};
