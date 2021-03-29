import { UserAction, UserActionTypes, UserState } from '../../models/user';

const {
  FETCH_USER,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  FETCH_USER_ERROR,
} = UserActionTypes;

const initialState: UserState = {
  user: {
    message: '',
    token: '',
    refreshToken: '',
    userId: '',
    name: '',
  },
  isLoggedIn: false,
  loading: false,
  error: null,
  notification: '',
};

export const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, loading: true };

    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, notification: action.payload };

    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };

    case FETCH_USER_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
