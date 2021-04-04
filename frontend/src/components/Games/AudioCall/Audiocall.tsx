import React, { FC, useState, useEffect } from 'react';
import { Word } from '../../../models/word';
import Finish from '../Finish';
import CloseButton from '../../CloseButton';
import ModalOnClose from './ModalOnClose';
import { WORD_GROUPS, API_BASE_URL } from '../../../constants/constants';
import './Audiocall.scss';

const Audiocall: FC = () => {
  const NUMBER_OF_VARIANTS = 5;
  const words = [
    {
      _id: {
        $oid: '5e9f5ee35eb9e72bc21af4a0',
      },
      group: 0,
      page: 0,
      word: 'alcohol',
      image: 'files/01_0002.jpg',
      audio: 'files/01_0002.mp3',
      audioMeaning: 'files/01_0002_meaning.mp3',
      audioExample: 'files/01_0002_example.mp3',
      textMeaning: 'Alcohol is a type of drink that can make people drunk.',
      textExample: 'A person should not drive a car after he or she has been drinking alcohol.',
      transcription: '[ǽlkəhɔ̀ːl]',
      __v: 0,
      textExampleTranslate: 'Человек не должен водить машину после того, как он выпил алкоголь',
      textMeaningTranslate: 'Алкоголь - это тип напитка, который может сделать людей пьяными',
      wordTranslate: 'алкоголь',
    },
    {
      _id: {
        $oid: '5e9f5ee35eb9e72bc21af4a2',
      },
      group: 0,
      page: 0,
      word: 'boat',
      image: 'files/01_0005.jpg',
      audio: 'files/01_0005.mp3',
      audioMeaning: 'files/01_0005_meaning.mp3',
      audioExample: 'files/01_0005_example.mp3',
      textMeaning: 'A boat is a vehicle that moves across water.',
      textExample: 'There is a small boat on the lake.',
      transcription: '[bout]',
      __v: 0,
      textExampleTranslate: 'На озере есть маленькая лодка',
      textMeaningTranslate: 'Лодка - это транспортное средство, которое движется по воде',
      wordTranslate: 'лодка',
    },
    {
      _id: {
        $oid: '5e9f5ee35eb9e72bc21af4a1',
      },
      group: 0,
      page: 0,
      word: 'agree',
      image: 'files/01_0001.jpg',
      audio: 'files/01_0001.mp3',
      audioMeaning: 'files/01_0001_meaning.mp3',
      audioExample: 'files/01_0001_example.mp3',
      textMeaning: 'To agree is to have the same opinion or belief as another person.',
      textExample: 'The students agree they have too much homework.',
      transcription: '[əgríː]',
      __v: 0,
      textExampleTranslate: 'Студенты согласны, что у них слишком много домашней работы',
      textMeaningTranslate: 'Согласиться - значит иметь то же мнение или убеждение, что и другой человек',
      wordTranslate: 'согласна',
    },
    {
      _id: {
        $oid: '5e9f5ee35eb9e72bc21af4a3',
      },
      group: 0,
      page: 0,
      word: 'arrive',
      image: 'files/01_0003.jpg',
      audio: 'files/01_0003.mp3',
      audioMeaning: 'files/01_0003_meaning.mp3',
      audioExample: 'files/01_0003_example.mp3',
      textMeaning: 'To arrive is to get somewhere.',
      textExample: 'They arrived at school at 7 a.m.',
      transcription: '[əráiv]',
      __v: 0,
      textExampleTranslate: 'Они прибыли в школу в 7 часов утра',
      textMeaningTranslate: 'Приехать значит попасть куда-то',
      wordTranslate: 'прибыть',
    },
    {
      _id: {
        $oid: '5e9f5ee35eb9e72bc21af4a4',
      },
      group: 0,
      page: 0,
      word: 'August',
      image: 'files/01_0004.jpg',
      audio: 'files/01_0004.mp3',
      audioMeaning: 'files/01_0004_meaning.mp3',
      audioExample: 'files/01_0004_example.mp3',
      textMeaning: 'August is the eighth month of the year.',
      textExample: 'Is your birthday in August?',
      transcription: '[ɔ́ːgəst]',
      __v: 0,
      textExampleTranslate: 'У тебя день рождения в августе?',
      textMeaningTranslate: 'Август - восьмой месяц года',
      wordTranslate: 'август',
    },
    {
      _id: {
        $oid: '5e9f5ee35eb9e72bc21af4a5',
      },
      group: 0,
      page: 0,
      word: 'breakfast',
      image: 'files/01_0006.jpg',
      audio: 'files/01_0006.mp3',
      audioMeaning: 'files/01_0006_meaning.mp3',
      audioExample: 'files/01_0006_example.mp3',
      textMeaning: 'Breakfast is the morning meal.',
      textExample: 'I ate eggs for breakfast.',
      transcription: '[brekfəst]',
      __v: 0,
      textExampleTranslate: 'Я ел яйца на завтрак',
      textMeaningTranslate: 'Завтрак - это утренняя трапеза',
      wordTranslate: 'завтрак',
    },
    {
      _id: {
        $oid: '5e9f5ee35eb9e72bc21af4a6',
      },
      group: 0,
      page: 0,
      word: 'camera',
      image: 'files/01_0007.jpg',
      audio: 'files/01_0007.mp3',
      audioMeaning: 'files/01_0007_meaning.mp3',
      audioExample: 'files/01_0007_example.mp3',
      textMeaning: 'A camera is a piece of equipment that takes pictures.',
      textExample: 'I brought my camera on my vacation.',
      transcription: '[kǽmərə]',
      __v: 0,
      textExampleTranslate: 'Я принес свою камеру в отпуск',
      textMeaningTranslate: 'Камера - это часть оборудования, которая делает снимки',
      wordTranslate: 'камера',
    },
    {
      _id: {
        $oid: '5e9f5ee35eb9e72bc21af4a7',
      },
      group: 0,
      page: 0,
      word: 'capital',
      image: 'files/01_0008.jpg',
      audio: 'files/01_0008.mp3',
      audioMeaning: 'files/01_0008_meaning.mp3',
      audioExample: 'files/01_0008_example.mp3',
      textMeaning: 'A capital is a city where a country’s government is based.',
      textExample: 'The capital of the United States is Washington, D.C.',
      transcription: '[kæpətl]',
      __v: 0,
      textExampleTranslate: 'Столица Соединенных Штатов - Вашингтон, округ Колумбия',
      textMeaningTranslate: 'Столица - это город, в котором базируется правительство страны',
      wordTranslate: 'столица',
    },
    {
      _id: {
        $oid: '5e9f5ee35eb9e72bc21af4a8',
      },
      group: 0,
      page: 0,
      word: 'catch',
      image: 'files/01_0009.jpg',
      audio: 'files/01_0009.mp3',
      audioMeaning: 'files/01_0009_meaning.mp3',
      audioExample: 'files/01_0009_example.mp3',
      textMeaning: 'To catch is to grab or get something.',
      textExample: 'Did you catch the ball during the baseball game?',
      transcription: '[kætʃ]',
      __v: 0,
      textExampleTranslate: 'Вы поймали мяч во время игры в бейсбол?',
      textMeaningTranslate: 'Поймать - значит схватить или получить что-то',
      wordTranslate: 'поймать',
    },
    {
      _id: {
        $oid: '5e9f5ee35eb9e72bc21af4a9',
      },
      group: 0,
      page: 0,
      word: 'duck',
      image: 'files/01_0010.jpg',
      audio: 'files/01_0010.mp3',
      audioMeaning: 'files/01_0010_meaning.mp3',
      audioExample: 'files/01_0010_example.mp3',
      textMeaning: 'A duck is a small water bird.',
      textExample: 'People feed ducks at the lake.',
      transcription: '[dʌk]',
      __v: 0,
      textExampleTranslate: 'Люди кормят уток у озера',
      textMeaningTranslate: 'Утка - маленькая водяная птица',
      wordTranslate: 'утка',
    },
  ];
  const [correctAnswers, setCorrectAnswers] = useState<Word[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Word[]>([]);
  const [start, setStart] = useState(false);
  const [modalOnCloseIsActive, setModalOnCloseIsActive] = useState(false);
  const [currentView, setCurrentView] = useState(false);
  const [currentWordNumber, setCurrentWordNumber] = useState(-1);
  const [currentWord, setCurrentWord] = useState(words[currentWordNumber] || undefined);
  const [wordsVariants, setWordsVariants] = useState<string[]>([]);
  const [pressedButtonIdx, setPressedButtonIdx] = useState(-1);
  const [correctButtonIdx, setCorrectButtonIdx] = useState(-1);

  const wordSoundUrl = (word: Word) => `${API_BASE_URL}/${word?.audio}`;

  const shuffle = (array: string[]): string[] => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fillStepAnswers = (): string[] => {
    const stepAnswers = [currentWord?.wordTranslate];
    while (stepAnswers.length < NUMBER_OF_VARIANTS) {
      const randomWordNumber = Math.floor(Math.random() * words.length);
      if (!stepAnswers.includes(words[randomWordNumber].wordTranslate)) {
        stepAnswers.push(words[randomWordNumber].wordTranslate);
      }
    }
    return shuffle(stepAnswers);
  };

  const playSound = (soundUrl: string) => {
    if (currentWordNumber >= 0) {
      const wordAudio = new Audio(soundUrl);
      wordAudio.play();
    }
  };

  useEffect(() => {
    setCurrentWord(words[currentWordNumber]);
  }, [currentWordNumber]);

  useEffect(() => {
    if (currentWordNumber < words.length) playSound(wordSoundUrl(currentWord));
    const newWordsVariants: string[] = fillStepAnswers();
    setWordsVariants(newWordsVariants);
    setCurrentView(false);
  }, [currentWord]);

  useEffect(() => {
    setCorrectButtonIdx(wordsVariants.indexOf(currentWord?.wordTranslate));
  }, [wordsVariants]);

  const nextWord = () => {
    if (currentWordNumber < words.length) setCurrentWordNumber(currentWordNumber + 1);
    setWordsVariants([]);
    setPressedButtonIdx(-1);
    setCorrectButtonIdx(-1);
  };

  const clickStart = () => {
    setStart(true);
    setCurrentWordNumber(0);
    const newWordsVariants: string[] = fillStepAnswers();
    setWordsVariants(newWordsVariants);
  };

  const checkAnswer = (answer: string) => {
    setCurrentView(true);

    if (answer === currentWord.wordTranslate) {
      const updatedCorrectAnswers = correctAnswers;
      updatedCorrectAnswers.push(currentWord);
      setCorrectAnswers(updatedCorrectAnswers);
    }
    const updatedWrongAnswers = wrongAnswers;
    updatedWrongAnswers.push(currentWord);
    setWrongAnswers(updatedWrongAnswers);
  };

  const answerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLElement;
    checkAnswer(target.innerText);
    setPressedButtonIdx(wordsVariants.indexOf(target.innerText));
  };

  const dontKnowClick = () => {
    setCurrentView(true);
    const updatedWrongAnswers = wrongAnswers;
    updatedWrongAnswers.push(currentWord);
    setWrongAnswers(updatedWrongAnswers);
  };

  const OpenCurrentWord = () => (
    <div className="audiocall__current-word">
      <div className="audiocall__current-word__img">
        <img src={`https://rslang-2020q3.herokuapp.com/${currentWord.image}`} />
      </div>
      <button onClick={() => playSound(wordSoundUrl(currentWord))} className="audiocall__volume volume-button">
        <i className="fas fa-volume-up"></i>
      </button>
      <div className="audiocall__current-word__text">{currentWord.word}</div>
    </div>
  );

  const CloseCurrentWord = () => (
    <div className="audiocall__current-word">
      <button onClick={() => playSound(wordSoundUrl(currentWord))} className="audiocall__volume_main volume-button">
        <i className="fas fa-volume-up"></i>
      </button>
    </div>
  );

  const VariantsButtons = () => {
    const buttonClass = (inx: number) => {
      if (currentView) {
        if (inx === pressedButtonIdx && pressedButtonIdx !== correctButtonIdx) return 'button is-ghost wrong';
        if (inx === correctButtonIdx) return 'button is-ghost correct';
        return 'button is-ghost';
      }
      return 'button is-ghost';
    };

    return (
      <ul className="audiocall__answers__variants">
        {wordsVariants.map((item, index) => (
          <li key={wordsVariants[index]} className="audiocall__answers__button">
            <button className={buttonClass(index)} disabled={currentView} onClick={e => answerClick(e)}>
              {wordsVariants[index]}
            </button>
            <span className="audiocall__hotKey">{`${index + 1}`}</span>
          </li>
        ))}
      </ul>
    );
  };

  const keyControls = (e: any) => {
    switch (e.code) {
      case 'Digit1':
      case 'Numpad1':
        checkAnswer(wordsVariants[0]);
        break;
      case 'Digit2':
      case 'Numpad2':
        checkAnswer(wordsVariants[1]);
        break;
      case 'Digit3':
      case 'Numpad3':
        checkAnswer(wordsVariants[2]);
        break;
      case 'Digit4':
      case 'Numpad4':
        checkAnswer(wordsVariants[3]);
        break;
      case 'Digit5':
      case 'Numpad5':
        checkAnswer(wordsVariants[4]);
        break;
      default:
    }
  };

  const enterKey = (e: any) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      if (currentView) nextWord();
      else dontKnowClick();
    }
  };

  useEffect(() => {
    const setKeyContols = () => {
      window.addEventListener('keydown', keyControls);
    };
    setKeyContols();
    return () => window.removeEventListener('keydown', keyControls);
  }, [wordsVariants]);

  useEffect(() => {
    window.addEventListener('keydown', enterKey);
    return () => window.removeEventListener('keydown', enterKey);
  }, [currentView]);

  const handleSubmitClose = () => {
    window.location.href = '../';
  };

  const handleCancelModal = () => {
    setModalOnCloseIsActive(false);
  };

  // if (currentWordNumber >= words.length) {
  //   return <Finish correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} score={correctAnswers.length * 2} />;
  // }
  return (
    <div className="audiocall">
      <CloseButton callback={() => setModalOnCloseIsActive(true)} />
      <ModalOnClose
        modalIsActive={modalOnCloseIsActive}
        handleCancelModal={handleCancelModal}
        handleSubmitClose={handleSubmitClose}
      />
      {!start && (
        <button className="button is-warning" onClick={clickStart}>
          Начать игру
        </button>
      )}
      {start && currentWordNumber >= 0 && currentWordNumber < words.length && (
        <div className="audiocall_inner">
          <div>
            {currentView && <OpenCurrentWord />}
            {!currentView && <CloseCurrentWord />}
          </div>
          <div className="audiocall__answers">
            <VariantsButtons />

            {currentView && (
              <button className="button is-danger" onClick={nextWord}>
                <i className="fas fa-angle-double-right"></i>
              </button>
            )}
            {!currentView && (
              <button className="button is-danger" onClick={dontKnowClick}>
                Я не знаю
              </button>
            )}
          </div>
        </div>
      )}
      {start && currentWordNumber >= words.length && (
        <Finish correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} score={correctAnswers.length * 10} />
      )}
    </div>
  );
};
export default Audiocall;
