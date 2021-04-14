import { Dispatch } from 'react';

interface SetDarkMode {
  type: ThemeActionTypes.SET_DARK_MODE;
  payload: boolean;
}
export enum ThemeActionTypes {
  SET_DARK_MODE = 'SET_DARK_MODE',
}
export interface ThemeState {
  darkMode: boolean;
}
export type ThemeChangeAction = SetDarkMode;

export interface ThemeDispatchProps {
  setDarkMode: (darkMode: boolean) => (dispatch: Dispatch<ThemeChangeAction>) => void;
}
