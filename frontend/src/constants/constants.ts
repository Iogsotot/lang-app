export const FOOTER_COPYRIGHT = {
  developers: [
    { link: 'https://github.com/bramov', name: '@Bramov' },
    { link: 'https://github.com/GregoryMoskalev', name: '@GregoryMoskalev' },
    { link: 'https://github.com/johnneon', name: '@Johnneon' },
    { link: 'https://github.com/Iogsotot', name: '@IogSotot' },
    { link: 'https://github.com/svetlana-tyshkevich', name: '@Svetlana-tyshkevich' },
    { link: 'https://github.com/AinuAnna', name: '@AinuAnna' },
  ],
};

export const API_BASE_URL = 'https://rslang-2020q3.herokuapp.com';

export const locations = {
  TEXTBOOK: 'textbook',
};

export const WORD_GROUPS = {
  Novice: 0,
  Easy: 1,
  Middle: 2,
  Hard: 3,
  Impossible: 4,
  Legendary: 5,
};

export const SPRINT = {
  gameDuration: 60,
  timerColor: '#00d1b2',
  timerSize: 80,
  timerStrokeWidth: 3,
  colorOnCorrectAnswer: '141, 71%, 48%', // hsl(141, 71%, 48%)
  colorOnWrongAnswer: '348, 100%, 61%', // hsl(348, 100%, 61%)
  wrongBtnText: 'Неверно',
  correctBtnText: 'Верно',
  wordsAmount: 10,
  basicPoints: 10,
  maxModificator: 4,
  maxStreak: 3,
};

export const SPRINT_MODAL_ON_CLOSE = {
  modalTitle: 'Тренировка не закончена!',
  modalSubTitle: 'Если вы закроете тренировку, ваши результаты обнулятся',
  sumbitCloseBtnText: 'Закрыть тренировку',
  canselModalBtn: 'Отмена',
};

export const SPRINT_GET_READY = {
  title: 'Приготовьтесь',
  timerColor: '#00d1b2',
  timerDuration: 5,
  timerStrokeWidth: 3,
  timerSize: 80,
};
