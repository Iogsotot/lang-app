const TYPES: {
  text: 'text';
  email: 'email';
  password: 'password';
} = {
  text: 'text',
  email: 'email',
  password: 'password',
};

export const messages = {
  NAME_TEST_REGEX: /[a-zA-Z]{3,}$/,
  EMAIL_TEST_REGEX: /^[\w!#$%&'*+/=?^_`{|}~]*(?:\.?[\w!#$%&'*+/=?^_`{|}~-]+)@[^.@]+\.[^.@]{2,}$/,
  PASSWORD_TEST_REGEX: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
  USER_ICON: 'fa-user',
  ENVELOPE_ICON: 'fa-envelope',
  LOCK_ICON: 'fa-lock',
  SIGN_IN: 'Войти',
  SIGN_UP: 'Зарегистрироваться',
  NAME: 'Имя',
  EMAIL: 'Электронная почта',
  PASSWORD: 'Пароль',
  TYPE: { ...TYPES },
  NAME_AVALIABLE: 'Это имя пользователя доступно',
  EMAIL_AVALIABLE: 'Этот адрес доступен',
  PASSWORD_AVALIABLE: 'Приемлимая сложность пароля',
  INCORRECT_NAME: 'Имя должно содержать минимум 3 символа и состоять только из латинских букв.',
  INCORRECT_EMAIL: 'Некоректный адрес электронной почты',
  INCORRECT_PASSWORD:
    'Пароль должен содержать по одной заглавной и строчной букве и цифру. Минимальное количество символов - 8.',
  USER_NOT_FOUND: 'Пользователь не найден',
  USER_HAS_BEEN_REGISTERED: 'Пользователь с таким электронным адресом уже зарегистрирован',
};
