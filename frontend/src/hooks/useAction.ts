import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../store/action-creators';
import { WordsDispatchProps } from '../models/word';
import { UsersDispatchProps } from '../models/user';

type DispatchProps = WordsDispatchProps & UsersDispatchProps;

export const useAction = (): DispatchProps => {
  const dispatch = useDispatch();

  return bindActionCreators(ActionCreators, dispatch);
};
