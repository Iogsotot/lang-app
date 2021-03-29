import './authPage.scss';
import React, { FC, useState, useEffect } from 'react';
import Input from '../Input';
import { useValidation } from '../../hooks/useValidation';
import { constants } from '../../constants';
import { useAction } from '../../hooks/useAction';

const {
  NAME,
  EMAIL,
  PASSWORD,
  TYPE,
  USER_ICON,
  ENVELOPE_ICON,
  LOCK_ICON,
  SIGN_UP,
  SIGN_IN,
} = constants.messages;

const AuthPage: FC = () => {
  const { register, login } = useAction();
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

  const onSubmit = () => {
    const formData = new FormData();

    if (isLogin) {
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);

      login(formData);
    } else {
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);

      register(formData);
    }
  };

  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
  }, [isLogin]);

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

        <p>Do u have acc?</p> <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? SIGN_UP : SIGN_IN}</button>

      </div>

    </main>
  );
};

export default AuthPage;
