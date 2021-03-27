import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { IRootState } from '../store/reducers';

export const useTypedSelector: TypedUseSelectorHook<IRootState> = useSelector;
