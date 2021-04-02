import { Dispatch } from 'react';

export interface User {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
  avatar: string;
  email: string;
}

export interface UserState {
  user: User;
  isLoggedIn: boolean;
  loading: boolean;
  error: null | string;
  notification: string;
}

export interface RegisterResponse {
  id: string;
  name: string;
  email: string;
}

export interface UsersDispatchProps {
  register: (formData: FormData) => (dispatch: Dispatch<UserAction>) => void;
  login: (formData: FormData) => (dispatch: Dispatch<UserAction>) => void;
  logout: () => (dispatch: Dispatch<UserAction>) => void;
  clearUserNotifications: () => (dispatch: Dispatch<UserAction>) => void;
}

interface FetchUserAction {
  type: UserActionTypes.FETCH_USER;
}

interface RegisterUserSuccessAction {
  type: UserActionTypes.REGISTER_USER_SUCCESS;
  payload: string;
}

interface LoginUserSuccessAction {
  type: UserActionTypes.LOGIN_USER_SUCCESS;
  payload: User;
}

interface FetchUserErrorAction {
  type: UserActionTypes.FETCH_USER_ERROR;
  payload: string;
}

interface ClearUserNotificationsAction {
  type: UserActionTypes.CLEAR_USER_NOTIFICATIONS;
}

interface LogOut {
  type: UserActionTypes.LOG_OUT;
}

export enum UserActionTypes {
  FETCH_USER = 'FETCH_USER',
  REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  FETCH_USER_ERROR = 'FETCH_USER_ERROR',
  CLEAR_USER_NOTIFICATIONS = 'CLEAR_USER_NOTIFICATIONS',
  LOG_OUT = 'LOG_OUT',
}

export type UserAction =
  FetchUserAction
  | RegisterUserSuccessAction
  | LoginUserSuccessAction
  | FetchUserErrorAction
  | ClearUserNotificationsAction
  | LogOut;
