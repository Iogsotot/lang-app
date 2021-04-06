interface PushToHistory {
  type: HistoryActionTypes.PUSH_TO_HISTORY;
  payload: [];
}

interface ClearHistory {
  type: HistoryActionTypes.CLEAR_HISTORY;
  payload: [];
}

export enum HistoryActionTypes {
  PUSH_TO_HISTORY = 'PUSH_TO_HISTORY',
  CLEAR_HISTORY = 'CLEAR_HISTORY',
}
export interface HistoryState {
  history: [];
}
export type HistoryAction =
  PushToHistory
  | ClearHistory;
