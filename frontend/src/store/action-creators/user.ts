import { Dispatch } from 'react';
import { API_BASE_URL, notifications, storageNames } from '../../constants';
import { UserAction, UserActionTypes } from '../../models/user';

const {
  USER_HAS_BEEN_REGISTERED,
  INCORECT_EMAIL_OR_PASSWORD,
} = notifications;

const {
  FETCH_USER,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  FETCH_USER_ERROR,
  CLEAR_USER_NOTIFICATIONS,
  LOG_OUT,
} = UserActionTypes;

const { USER_STORAGE } = storageNames;

export const register = (formData: FormData) =>
  (async (dispatch: Dispatch<UserAction>): Promise<void> => {
    dispatch({ type: FETCH_USER });
    try {
      const response = await fetch(`${API_BASE_URL}/users`, { method: 'POST', body: formData });
      const data = await response.json();

      if (response.status === 417) {
        throw new Error(USER_HAS_BEEN_REGISTERED);
      }
      if (!response.ok) {
        throw new Error(data.error.errors[0].message || 'Something wrong');
      }

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_USER_ERROR, payload: error.message });
    }
  });

export const login = (formData: FormData) =>
  (async (dispatch: Dispatch<UserAction>): Promise<void> => {
    dispatch({ type: FETCH_USER });
    try {
      const response = await fetch(`${API_BASE_URL}/signin`, { method: 'POST', body: formData });
      if (response.status === 403 || response.status === 404) {
        throw new Error(INCORECT_EMAIL_OR_PASSWORD);
      }
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem(USER_STORAGE, JSON.stringify({
          user: { ...data },
          isLoggedIn: true,
        }));
        dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({ type: FETCH_USER_ERROR, payload: error.message });
    }
  });

export const logout = () =>
  ((dispatch: Dispatch<UserAction>): void => {
    localStorage.removeItem(USER_STORAGE);
    dispatch({ type: LOG_OUT });
  });

export const clearUserNotifications = () =>
  ((dispatch: Dispatch<UserAction>): void => {
    dispatch({ type: CLEAR_USER_NOTIFICATIONS });
  });
