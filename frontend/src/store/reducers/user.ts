import { UserAction, UserActionTypes, UserState } from '../../models/user';
import { notifications } from '../../constants';

const {
  USER_CREATED_SUCCESSFULLY,
} = notifications;

const {
  FETCH_USER,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  FETCH_USER_ERROR,
  CLEAR_USER_NOTIFICATIONS,
  LOG_OUT,
  REFRESH_TOKEN,
} = UserActionTypes;

const initialState: UserState = {
  user: {
    message: '',
    token: '',
    refreshToken: '',
    userId: '',
    name: '',
    email: '',
    avatar: '',
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
      return { ...state, loading: false, notification: USER_CREATED_SUCCESSFULLY };

    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, isLoggedIn: true, user: action.payload };

    case FETCH_USER_ERROR:
      return { ...state, loading: false, error: action.payload };

    case LOG_OUT:
      return { ...state, ...initialState, isLoggedIn: false };

    case REFRESH_TOKEN:
      return { ...state, user: action.payload };

    case CLEAR_USER_NOTIFICATIONS:
      return { ...state, notification: '', error: null };

    default:
      return state;
  }
};
