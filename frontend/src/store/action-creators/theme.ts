import { Dispatch } from 'react';
import { ThemeActionTypes, ThemeChangeAction } from '../../models/theme';

const {
  SET_DARK_MODE,
} = ThemeActionTypes;

export const setDarkMode = (darkMode: boolean) => (dispatch: Dispatch<ThemeChangeAction>): void => {
  dispatch({
    type: SET_DARK_MODE,
    payload: darkMode,
  });
};
