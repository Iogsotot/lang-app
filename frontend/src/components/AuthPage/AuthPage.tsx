import './authPage.scss';
import React, { FC, useState } from 'react';
import Input from '../Input';

const AuthPage: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target);
  };

  return (
    <main>

      <div className="form">

        <Input
          name={'Email'}
          icon={'fa-user'}
          type={'email'}
          value={''}
          success={true}
          successText={'This username is available'}
          onChangeHandler={handleChange}
        />
        <Input
          name={'Name'}
          icon={'fa-envelope'}
          type={'text'}
          value={''}
          error={true}
          errorText={'This email is invalid'}
          onChangeHandler={handleChange}
        />
        <Input
          name={'Password'}
          icon={'fa-lock'}
          type={'password'}
          value={''}
          onChangeHandler={handleChange}
        />

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">Sign up</button>
          </div>
        </div>

        <p>Do u have acc? Sign in</p>

      </div>

    </main>
  );
};

export default AuthPage;
