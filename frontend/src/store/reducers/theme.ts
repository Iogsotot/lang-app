import { ThemeActionTypes, ThemeChangeAction, ThemeState } from '../../models/theme';

const {
  SET_DARK_MODE,
} = ThemeActionTypes;

const initialState: ThemeState = {
  darkMode: false,
};

export const themeReducer = (state = initialState, action: ThemeChangeAction): ThemeState => {
  switch (action.type) {
    case SET_DARK_MODE:
      return { ...state, darkMode: action.payload };

    default:
      return state;
  }
};
