import './authPage.scss';
import React, { FC, useState } from 'react';
import Input from '../Input';
import { useValidation } from '../../hooks/useValidation';
import { constants } from '../../constants';

const {
  NAME,
  EMAIL,
  PASSWORD,
  TYPE,
  USER_ICON,
  ENVELOPE_ICON,
  LOCK_ICON,
  SIGN_UP,
} = constants.messages;

const AuthPage: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    nameError,
    emailErorr,
    passwordError,
    nameSuccess,
    emailSuccess,
    passwordSuccess,
    formReady,
  } = useValidation({ name, email, password });

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <main>

      <div className="form">

        <Input
          placeholder={NAME}
          icon={USER_ICON}
          type={TYPE.text}
          value={name}
          successText={nameSuccess}
          errorText={nameError}
          onChangeHandler={onNameChange}
        />
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
            <button disabled={!formReady} className="button is-link">{SIGN_UP}</button>
          </div>
        </div>

        <p>Do u have acc? Sign in</p>

      </div>

    </main>
  );
};

export default AuthPage;
