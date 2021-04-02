import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../store/action-creators';
import { WordsDispatchProps } from '../models/word';

export const useAction = (): WordsDispatchProps => {
  const dispatch = useDispatch();

  return bindActionCreators(ActionCreators, dispatch);
};
