import * as WordsActionCreators from './words';
import * as UserActionCreators from './user';
import * as ThemeActionCreators from './theme';

export const ActionCreators = {
  ...WordsActionCreators,
  ...UserActionCreators,
  ...ThemeActionCreators,
};
