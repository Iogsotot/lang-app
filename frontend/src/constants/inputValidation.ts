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
  NAME: 'Имя',
  EMAIL: 'Электронная почта',
  PASSWORD: 'Пароль',
  NAME_FOR_CODE: 'name',
  EMAIL_FOR_CODE: 'email',
  PASSWORD_FOR_CODE: 'password',
  AVATAR: 'avatar',
  TYPE: { ...TYPES },
  NAME_AVALIABLE: 'Это имя пользователя доступно',
  EMAIL_AVALIABLE: 'Этот адрес доступен',
  PASSWORD_AVALIABLE: 'Приемлимая сложность пароля',
  INCORRECT_NAME: 'Имя должно содержать минимум 3 символа и состоять только из латинских букв.',
  INCORRECT_EMAIL: 'Некоректный адрес электронной почты',
  INCORRECT_PASSWORD:
    'Пароль должен содержать по одной заглавной и строчной букве и цифру. Минимальное количество символов - 8.',
};
