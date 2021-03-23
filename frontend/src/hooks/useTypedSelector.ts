import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { IRootState } from '../store/rootReduser';

export const useTypedSelector: TypedUseSelectorHook<IRootState> = useSelector;
