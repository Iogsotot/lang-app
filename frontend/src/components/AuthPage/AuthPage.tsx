import './authPage.scss';
import React, { FC, useState, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useAction } from '../../hooks/useAction';
import Input from '../Input';
import { useValidation } from '../../hooks/useValidation';
import { messages, auth, notifications } from '../../constants';
import Notification from '../Notification';
import AvatarUpload from '../AvatarUpload';

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
  AVATAR,
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
  const { error, notification, loading } = useTypedSelector((store) => store.user);
  const [image, setImage] = useState<string | Blob>('');
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

  const onImageReady = (target: File) => {
    setImage(target);
  };

  const onSubmit = () => {
    const formData = new FormData();

    formData.append(NAME_FOR_CODE, name);
    formData.append(EMAIL_FOR_CODE, email);
    formData.append(PASSWORD_FOR_CODE, password);
    formData.append(AVATAR, image);

    if (isLogin) {
      login(formData);
    } else {
      register(formData);
    }
  };

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (formReady && !loading) {
        onSubmit();
      }
    }
  };

  const toLoginForm = () => {
    setIsLogin(false);
  };

  const toRegisterForm = () => {
    setIsLogin(true);
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
    <main className="auth">
       <div className="bg-video-wrap">
       <video src="https://designsupply-web.com/samplecontent/vender/codepen/20181014.mp4" autoPlay muted loop>
        </video>
        <div className="overlay">
    </div>
      <div className="form">
        <div className="form__tabs">
          <button onClick={toLoginForm} className={`form__tabs__link ${!isLogin ? 'active' : ''}`}>{SIGN_UP}</button>
          <button onClick={toRegisterForm} className={`form__tabs__link ${isLogin ? 'active' : ''}`}>{SIGN_IN}</button>
        </div>
        {!isLogin
          ? <>
            <AvatarUpload onImageReady={target => onImageReady(target)} />
            <Input
              placeholder={NAME}
              icon={USER_ICON}
              type={TYPE.text}
              value={name}
              successText={nameSuccess}
              errorText={nameError}
              onChangeHandler={onNameChange}
              keyPressHandler={keyPressHandler}
            />
          </>
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
          keyPressHandler={keyPressHandler}
        />
        <Input
          placeholder={PASSWORD}
          icon={LOCK_ICON}
          type={TYPE.password}
          value={password}
          successText={passwordSuccess}
          errorText={passwordError}
          onChangeHandler={onPasswordChange}
          keyPressHandler={keyPressHandler}
        />

        <div className="field is-grouped">
          <button
            disabled={!formReady || loading}
            className="btn btn-submit"
            onClick={onSubmit}
          >
            {!isLogin ? SIGN_UP : SIGN_IN}
          </button>
        </div>
      </div>

      <Notification
        error={error}
        notification={notification}
        clearNotification={clearUserNotifications}
      />
    </div>
    </main>
  );
};

export default AuthPage;
