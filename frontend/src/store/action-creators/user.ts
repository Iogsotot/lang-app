import { Dispatch } from 'react';
import { constants } from '../../constants';
import { UserAction, UserActionTypes } from '../../models/user';

const { API_BASE_URL } = constants;

const {
  FETCH_USER,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  FETCH_USER_ERROR,
} = UserActionTypes;

export const register = (formData: FormData) =>
  (async (dispatch: Dispatch<UserAction>): Promise<void> => {
    dispatch({ type: FETCH_USER });
    const response = await fetch(`${API_BASE_URL}/users`, { method: 'POST', body: formData })
      .then((data) => data.json())
      .catch((error) => {
        if (typeof error === 'string') {
          dispatch({ type: FETCH_USER_ERROR, payload: error });
        } else {
          dispatch({ type: FETCH_USER_ERROR, payload: error?.errors?.message });
        }
      });
    dispatch({ type: REGISTER_USER_SUCCESS, payload: response });
  });

export const login = (formData: FormData) =>
  (async (dispatch: Dispatch<UserAction>): Promise<void> => {
    dispatch({ type: FETCH_USER });

    const response = await fetch(`${API_BASE_URL}/signin`, { method: 'POST', body: formData })
      .then((data) => data.json())
      .catch((error) => {
        if (typeof error === 'string') {
          dispatch({ type: FETCH_USER_ERROR, payload: error });
        } else {
          dispatch({ type: FETCH_USER_ERROR, payload: error?.errors?.message });
        }
      });

    dispatch({ type: LOGIN_USER_SUCCESS, payload: response });
  });
