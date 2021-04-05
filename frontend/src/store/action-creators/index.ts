import * as WordsActionCreators from './words';
import * as UserActionCreators from './user';

export const ActionCreators = {
  ...WordsActionCreators,
  ...UserActionCreators,
};
