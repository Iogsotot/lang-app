import { Dispatch } from 'react';
import { API_BASE_URL, auth } from '../../constants';
import { UserAction, UserActionTypes } from '../../models/user';

const {
  USER_HAS_BEEN_REGISTERED,
} = auth;

const {
  FETCH_USER,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  FETCH_USER_ERROR,
  CLEAR_USER_NOTIFICATIONS,
} = UserActionTypes;

export const register = (formData: FormData) =>
  (async (dispatch: Dispatch<UserAction>): Promise<void> => {
    dispatch({ type: FETCH_USER });
    try {
      const response = await fetch('http://localhost:8080/users', { method: 'POST', body: formData });
      const data = await response.json(); // `${API_BASE_URL}/users`

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
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.errors[0].message || 'Something wrong');
      }

      dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_USER_ERROR, payload: error.message });
    }
  });

export const clearUserNotifications = () =>
  ((dispatch: Dispatch<UserAction>): void => {
    dispatch({ type: CLEAR_USER_NOTIFICATIONS });
  });
