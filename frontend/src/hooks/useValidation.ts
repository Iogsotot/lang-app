import { useState, useEffect } from 'react';
import { constants } from '../constants';

const {
  NAME_TEST_REGEX,
  PASSWORD_TEST_REGEX,
  EMAIL_TEST_REGEX,
  INCORRECT_NAME,
  INCORRECT_EMAIL,
  INCORRECT_PASSWORD,
  NAME_AVALIABLE,
  EMAIL_AVALIABLE,
  PASSWORD_AVALIABLE,
} = constants.messages;

interface UseValidationProps {
  name: string;
  email: string;
  password: string;
  isLogin: boolean;
}

interface UseValidation {
  nameError: string;
  emailErorr: string;
  passwordError: string;
  nameSuccess: string;
  emailSuccess: string;
  passwordSuccess: string;
  formReady: boolean;
}

export const useValidation = ({ name, email, password, isLogin }: UseValidationProps): UseValidation => {
  const [nameError, setNameError] = useState('');
  const [emailErorr, setEmailErorr] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameSuccess, setNameSuccess] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [formReady, setFormReady] = useState(false);

  const nameCheck = !NAME_TEST_REGEX.test(name);
  const emailCheck = !EMAIL_TEST_REGEX.test(email);
  const passwordCheck = !PASSWORD_TEST_REGEX.test(password);

  useEffect(() => {
    if (name && isLogin) {
      if (nameCheck) {
        setNameSuccess('');
        setNameError(INCORRECT_NAME);
      } else {
        setNameError('');
        setNameSuccess(NAME_AVALIABLE);
      }
    } else {
      setNameError('');
      setNameSuccess('');
    }

    if (email) {
      if (emailCheck) {
        setEmailSuccess('');
        setEmailErorr(INCORRECT_EMAIL);
      } else {
        setEmailErorr('');
        setEmailSuccess(EMAIL_AVALIABLE);
      }
    } else {
      setEmailErorr('');
      setEmailSuccess('');
    }

    if (password) {
      if (passwordCheck) {
        setPasswordSuccess('');
        setPasswordError(INCORRECT_PASSWORD);
      } else {
        setPasswordError('');
        setPasswordSuccess(PASSWORD_AVALIABLE);
      }
    } else {
      setPasswordError('');
      setPasswordSuccess('');
    }

    if (nameSuccess && emailSuccess && passwordSuccess) {
      setFormReady(true);
    } else if (isLogin && emailSuccess && passwordSuccess) {
      setFormReady(true);
    } else {
      setFormReady(false);
    }
  }, [name, email, password]);

  return {
    nameError,
    emailErorr,
    passwordError,
    nameSuccess,
    emailSuccess,
    passwordSuccess,
    formReady,
  };
};
