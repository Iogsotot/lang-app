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

const INITIAL_WORD_STATE = {
  id: '',
  group: 0,
  page: 0,
  word: '',
  image: '',
  audio: '',
  audioMeaning: '',
  audioExample: '',
  textMeaning: '',
  textExample: '',
  transcription: '',
  textExampleTranslate: '',
  textMeaningTranslate: '',
  wordTranslate: '',
};

const INITIAL_PAIR_STATE = {
  word: 'null',
  wordTranslate: 'null',
  audio: 'null',
  answer: false,
};

const MAX_PAGE = 30;
const MIN_PAGE = 1;
const ALL_WORDS_IN_GROUP = 600;

const LOCATIONS = {
  textbook: 'textbook',
  dictionary: 'dictionary',
  sprint: 'sprint',
  savannah: 'savannah',
  puzzle: 'puzzle',
  audiocall: 'audiocall',
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

const SAVANNAH = {
  gameName: 'Savannah',
  gameDesc:
    'В этой игре на вас обрушится дождь из слов! к счастью слова падают по одной капельке.'
    + 'Ваша задача - успеть выбрать правильно слово до того, как оно упадёт. Удачи!',
};

const PUZZLE = {
  gameName: 'Puzzle',
  gameDesc:
    'В этой игре вы должны добавить правильное слово к фразе.'
    + 'Не знаю, зачем, но, может, вам так легче учить язык.',
};

const AUDIO_CALL = {
  gameName: 'Audiocall',
  gameDesc:
    'Улучшает восприятие речи на слух, а также навыки написания слов.'
    + 'В этой игре вы должны выбрать правильный перевод к произнесенному слову.',
};

const SPRINT = {
  gameName: 'Спринт',
  gameDesc: 'Учит быстро переводить на ваш родной язык. Для этой тренировки используются слова из вашего словаря.',
  gameDuration: 60,
  timerColor: '#00d1b2', // стандартный бульмовский бирюзовый
  timerSize: 80,
  timerStrokeWidth: 3,
  colorOnCorrectAnswer: '141, 71%, 48%', // hsl(141, 71%, 48%)
  colorOnWrongAnswer: '348, 100%, 61%', // hsl(348, 100%, 61%)
  wrongBtnText: 'Неверно',
  correctBtnText: 'Верно',
  wordsAmount: 100,
  basicPoints: 10,
  maxModificator: 4,
  maxStreak: 3,
  checkboxAuto: ' Автопроизношение',
};

const MODAL_ON_CLOSE = {
  modalTitle: 'Тренировка не закончена!',
  modalSubTitle: 'Если вы закроете тренировку, ваши результаты обнулятся',
  sumbitCloseBtnText: 'Закрыть тренировку',
  canselModalBtn: 'Отмена',
};

const SPRINT_GET_READY = {
  title: 'Приготовьтесь',
  timerColor: '#00d1b2', // стандартный бульмовский бирюзовый
  timerDuration: 5,
  timerStrokeWidth: 3,
  timerSize: 80,
};

export {
  INITIAL_WORD_STATE,
  WORD_GROUPS,
  API_BASE_URL,
  FOOTER_COPYRIGHT,
  LOCATIONS,
  SPRINT,
  USER_WORDS_FILTERS,
  MODAL_ON_CLOSE,
  SPRINT_GET_READY,
  MAX_PAGE,
  MIN_PAGE,
  ALL_WORDS_IN_GROUP,
  INITIAL_PAIR_STATE,
  SAVANNAH,
  PUZZLE,
  AUDIO_CALL,
};
