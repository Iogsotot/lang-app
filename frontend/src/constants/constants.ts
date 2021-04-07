const FOOTER_COPYRIGHT = {
  developers: [
    { link: 'https://github.com/bramov', name: '@Bramov' },
    { link: 'https://github.com/GregoryMoskalev', name: '@GregoryMoskalev' },
    { link: 'https://github.com/johnneon', name: '@Johnneon' },
    { link: 'https://github.com/Iogsotot', name: '@IogSotot' },
    { link: 'https://github.com/svetlana-tyshkevich', name: '@Svetlana-tyshkevich' },
    { link: 'https://github.com/AinuAnna', name: '@AinuAnna' },
  ],
};

const API_BASE_URL = 'https://rslang-2020q3.herokuapp.com';

const MAX_PAGE = 30;
const MIN_PAGE = 1;

const LOCATIONS = {
  textbook: 'textbook',
  dictionary: 'dictionary',
};

const USER_WORDS_FILTERS = {
  learningWords: '{"userWord.isLearning":true}',
  hardWords: '{"userWord.difficulty":"hard"}',
  deletedWords: '{"userWord.isDeleted":true}',
};

const WORD_GROUPS = {
  Novice: 0,
  Easy: 1,
  Middle: 2,
  Hard: 3,
  Impossible: 4,
  Legendary: 5,
};

const SPRINT = {
  gameDuration: 60,
  timerColor: '#00d1b2',
  timerSize: 80,
  timerStrokeWidth: 3,
  colorOnCorrectAnswer: '141, 71%, 48%', // hsl(141, 71%, 48%)
  colorOnWrongAnswer: '348, 100%, 61%', // hsl(348, 100%, 61%)
  wrongBtnText: 'Wrong',
  correctBtnText: 'Correct',
  wordsAmount: 10,
  basicPoints: 10,
  maxModificator: 4,
  maxStreak: 3,
};

const SPRINT_MODAL_ON_CLOSE = {
  modalTitle: "You haven't finished this training!",
  modalSubTitle: "If you close the training, you'll lose your results",
  sumbitCloseBtnText: 'Close training',
  canselModalBtn: 'Cancel',
};

const SPRINT_GET_READY = {
  title: 'Get Ready',
  timerColor: '#00d1b2',
  timerDuration: 5,
  timerStrokeWidth: 3,
  timerSize: 80,
};

export {
  WORD_GROUPS,
  API_BASE_URL,
  FOOTER_COPYRIGHT,
  LOCATIONS,
  SPRINT,
  USER_WORDS_FILTERS,
  SPRINT_MODAL_ON_CLOSE,
  SPRINT_GET_READY,
  MAX_PAGE,
  MIN_PAGE,
};
