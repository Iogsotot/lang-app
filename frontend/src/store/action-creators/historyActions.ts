import { Dispatch } from 'react';
import { HistoryAction, HistoryActionTypes } from '../../models';

const {
  PUSH_TO_HISTORY,
  CLEAR_HISTORY,
} = HistoryActionTypes;

export default {
  pushToHistory: (url: string) =>
    ((dispatch: Dispatch<HistoryAction>, getState: () => any): void => {
      const { history } = getState();
      const result = { ...history, url };
      dispatch({
        type: PUSH_TO_HISTORY,
        payload: result,
      });
    }),

  clearHitory: () =>
    ((dispatch: Dispatch<HistoryAction>): void => {
      dispatch({
        type: CLEAR_HISTORY,
        payload: [],
      });
    }),
};
