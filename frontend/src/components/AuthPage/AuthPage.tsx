import './authPage.scss';
import React, { FC, useState, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useAction } from '../../hooks/useAction';
import Input from '../Input';
import { useValidation } from '../../hooks/useValidation';
import { messages, auth, notifications } from '../../constants';
import Notification from '../Notification';

const {
  NAME,
  EMAIL,
  PASSWORD,
  TYPE,
  USER_ICON,
  ENVELOPE_ICON,
  LOCK_ICON,
  NAME_FOR_CODE,
  EMAIL_FOR_CODE,
  PASSWORD_FOR_CODE,
} = messages;

const {
  SIGN_UP,
  SIGN_IN,
} = auth;

const {
  USER_CREATED_SUCCESSFULLY,
} = notifications;

const AuthPage: FC = () => {
  const { register, login, clearUserNotifications } = useAction();
  const { error, notification } = useTypedSelector((store) => store.user);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const {
    nameError,
    emailErorr,
    passwordError,
    nameSuccess,
    emailSuccess,
    passwordSuccess,
    formReady,
  } = useValidation({ name, email, password, isLogin });

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
  };

  const onSubmit = () => {
    const formData = new FormData();

    formData.append(NAME_FOR_CODE, name);
    formData.append(EMAIL_FOR_CODE, email);
    formData.append(PASSWORD_FOR_CODE, password);

    if (isLogin) {
      login(formData);
    } else {
      register(formData);
    }
  };

  const onChangeForm = () => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
  }, [isLogin]);

  useEffect(() => {
    if (notification === USER_CREATED_SUCCESSFULLY) {
      setIsLogin(true);
    }
  }, [notification]);

  return (
    <main>
      <div className="form">

        {!isLogin
          ? <Input
            placeholder={NAME}
            icon={USER_ICON}
            type={TYPE.text}
            value={name}
            successText={nameSuccess}
            errorText={nameError}
            onChangeHandler={onNameChange}
          />
          : <></>
        }
        <Input
          placeholder={EMAIL}
          icon={ENVELOPE_ICON}
          type={TYPE.email}
          value={email}
          successText={emailSuccess}
          errorText={emailErorr}
          onChangeHandler={onEmailChange}
        />
        <Input
          placeholder={PASSWORD}
          icon={LOCK_ICON}
          type={TYPE.password}
          value={password}
          successText={passwordSuccess}
          errorText={passwordError}
          onChangeHandler={onPasswordChange}
        />

        <div className="field is-grouped">
          <div className="control">
            <button
              disabled={!formReady}
              className="button is-link"
              onClick={onSubmit}
            >
              {!isLogin ? SIGN_UP : SIGN_IN}
            </button>
          </div>
        </div>

        <p>Do u have acc?</p> <button onClick={onChangeForm}>{isLogin ? SIGN_UP : SIGN_IN}</button>

      </div>

      <Notification
        error={error}
        notification={notification}
        clearFunction={clearUserNotifications}
      />

    </main>
  );
};

export default AuthPage;
