import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { IRootState } from '../store/redusers';

export const useTypedSelector: TypedUseSelectorHook<IRootState> = useSelector;
