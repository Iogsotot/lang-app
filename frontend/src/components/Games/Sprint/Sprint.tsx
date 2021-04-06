import React, { useState, useEffect, FC } from 'react';
import { useHistory } from 'react-router-dom';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import useSound from 'use-sound';

import onWrong from '../../../assets/audio/wilhelm_scream.mp3';
import onCorrect from '../../../assets/audio/cratepop.mp3';
import onGameOver from '../../../assets/audio/952782968e924cf.mp3';
import onGameReady from '../../../assets/audio/622c286eab59510.mp3';

import Button from './Button';
import Streak from './Streak';
import ModalOnClose from './ModalOnClose';
import CloseButton from '../../CloseButton';
import GetReady from './GetReady';
import Frogs from './Frogs';
import ToggleButton from './ToggleButton';
import PlayAudioButton from './PlayAudioButton';
import { getRandomBooleanAnswer, randomInteger } from '../../../libs/random';
import { compareAnswer } from '../../../libs/gameLogic';
import { animateBorderColor } from '../../../libs/common';
import { Word } from '../../../models';
import { WordPair } from './Sprint.model';

import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useAction } from '../../../hooks/useAction';

import { SPRINT } from '../../../constants';

import './Sprint.scss';

const {
  gameDuration,
  timerColor,
  colorOnCorrectAnswer,
  colorOnWrongAnswer,
  wrongBtnText,
  correctBtnText,
  timerSize,
  timerStrokeWidth,
  wordsAmount,
  basicPoints,
  maxModificator,
  maxStreak,
} = SPRINT;

const Sprint: FC = () => {
  const history = useHistory();
  const [correctAnswerAudio] = useSound(onCorrect);
  const [wrongAnswerAudio] = useSound(onWrong);
  const [onGameOverAudio] = useSound(onGameOver);
  const [onGameReadyAudio] = useSound(onGameReady);
  const { words, group } = useTypedSelector(store => store.wordList);
  const { fetchRandomWords } = useAction();
  const [sprintWords, setSprintWords] = useState(words);
  const [streak, setStreak] = useState(0);
  const [IsPlaying, setIsPlaying] = useState(true);
  const [modalOnCloseIsActive, setModalOnCloseIsActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [getReadyIsPlaying, setGetReadyIsPlaying] = useState(true);
  const [points, setPoints] = useState(0);
  const [modificator, setModificator] = useState(1);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [currentWord, setCurrentWord] = useState<Word | any>({
    group: 0,
    page: 0,
    word: 'alcohol',
    image: 'files/01_0002.jpg',
    audio: 'files/01_0002.mp3',
    audioMeaning: 'files/01_0002_meaning.mp3',
    audioExample: 'files/01_0002_example.mp3',
    textMeaning: '<i>Alcohol</i> is a type of drink that can make people drunk.',
    textExample: 'A person should not drive a car after he or she has been drinking <b>alcohol</b>.',
    transcription: '[ǽlkəhɔ̀ːl]',

    textExampleTranslate: 'Человек не должен водить машину после того, как он выпил алкоголь',
    textMeaningTranslate: 'Алкоголь - это тип напитка, который может сделать людей пьяными',
    wordTranslate: 'алкоголь',
  });
  const [mistakesStat, setMistakesStat] = useState<Word[]>([]);
  const [correctAnswersStat, setCorrectAnswersStat] = useState<Word[]>([]);
  const [pair, setPair] = useState({
    word: 'null',
    wordTranslate: 'null',
    audio: 'null',
    answer: false,
  });
  const mod = basicPoints * 2 ** (modificator - 1);

  const addPoints = () => {
    setPoints(old => old + mod);
  };

  const findWordPair = (): WordPair => {
    if (sprintWords.length < 1) {
      // тута запускаем сообщение о конце игры
      if (isSoundOn && ready) {
        onGameOverAudio();
      }
      return {
        word: 'null',
        wordTranslate: 'null',
        audio: 'null',
        answer: false,
      };
    }
    const wordsList = sprintWords.slice(0);
    setCurrentWord(wordsList.pop() as Word);

    setSprintWords(wordsList);

    if (getRandomBooleanAnswer()) {
      return {
        word: currentWord.word,
        wordTranslate: currentWord.wordTranslate,
        audio: currentWord.audio,
        answer: true,
      };
    }

    const randomWordIndex = randomInteger(sprintWords.length - 2);
    return {
      word: currentWord.word,
      wordTranslate: sprintWords[randomWordIndex].wordTranslate,
      audio: currentWord.audio,
      answer: currentWord.word === sprintWords[randomWordIndex].word,
    };
  };

  const handleModificator = () => {
    if (streak >= maxStreak) {
      setStreak(0);
      setModificator(old => (old < 4 ? old + 1 : old));
    } else {
      setStreak(old => old + 1);
    }
  };

  const handleAnswerBtnClick = (arg: boolean): void => {
    if (!IsPlaying) return;
    if (compareAnswer(arg, pair.answer)) {
      // correct answer
      if (isSoundOn) {
        correctAnswerAudio();
      }
      setCorrectAnswersStat(prevState => [...prevState, currentWord]);
      addPoints();
      handleModificator();
      animateBorderColor('.sprint__box', colorOnCorrectAnswer);
    } else {
      // wrong answer
      if (isSoundOn) {
        wrongAnswerAudio();
      }
      setMistakesStat(prevState => [...prevState, currentWord]);
      setStreak(0);
      setModificator(1);
      animateBorderColor('.sprint__box', colorOnWrongAnswer);
    }
    setPair(findWordPair());
  };

  const handleArrowKeys = (event: KeyboardEvent) => {
    if (event.code === 'keyD' || event.code === 'ArrowRight') {
      handleAnswerBtnClick(true);
    } else if (event.code === 'keyA' || event.code === 'ArrowLeft') {
      handleAnswerBtnClick(false);
    }
  };

  useEffect(() => {
    fetchRandomWords(group, wordsAmount);
  }, [group]);

  useEffect(() => {
    if (words.length === 0) {
      return;
    }

    setSprintWords(words);
    setPair(findWordPair());
  }, [words, ready]);

  useEffect(() => {
    document.addEventListener('keyup', handleArrowKeys);

    return () => {
      document.removeEventListener('keyup', handleArrowKeys);
    };
  }, [pair]);

  const onCloseBtnClick = () => {
    if (ready) {
      setIsPlaying(false);
    } else {
      setGetReadyIsPlaying(false);
    }

    setModalOnCloseIsActive(true);
  };

  const handleSubmitClose = () => {
    history.push('/');
  };

  const handleCancelModal = () => {
    if (ready) {
      setIsPlaying(true);
    } else {
      setGetReadyIsPlaying(true);
    }
    setModalOnCloseIsActive(false);
  };

  const setReadyCallback = () => {
    setReady(true);
  };

  const togglePause = () => {
    setIsPlaying(old => !old);
  };

  const toggleSound = () => {
    setIsSoundOn(old => !old);
  };

  const { word, wordTranslate, audio } = pair;
  return (
    <div className="sprint">
      <CloseButton callback={onCloseBtnClick} />
      <ModalOnClose
        modalIsActive={modalOnCloseIsActive}
        handleCancelModal={handleCancelModal}
        handleSubmitClose={handleSubmitClose}
      />
      {!ready ? (
        <GetReady isPlaying={getReadyIsPlaying} onComplete={setReadyCallback} />
      ) : (
        <>
          <div onClick={togglePause} className={`countdown-wrapper ${!IsPlaying ? 'pause' : ''}`}>
            <CountdownCircleTimer
              onComplete={() => console.log('помогите, я застрял в коллбеке')}
              size={timerSize}
              strokeWidth={timerStrokeWidth}
              isPlaying={IsPlaying}
              duration={gameDuration}
              colors={timerColor}
            >
              {({ remainingTime }) => (IsPlaying ? remainingTime : null)}
            </CountdownCircleTimer>
          </div>
          <span className="score subtitle">{points}</span>
          <div className="box sprint__box">
            <ToggleButton className={'toggle-sound'} property={isSoundOn} callback={toggleSound} />
            <PlayAudioButton audio={audio} />
            <Streak streak={streak} isModMax={modificator === maxModificator} maxStreak={maxStreak} />
            {modificator > 1 && <span className="mod-note">{`+${mod} points per word`}</span>}
            <Frogs modificator={modificator} maxFrogs={maxModificator} />
            <div className="sprint__game-wrapper">
              <div className="title">{word}</div>
              <div className="subtitle">{wordTranslate}</div>
              <div className="buttons">
                <Button
                  icon="arrow-left"
                  className="is-danger"
                  text={wrongBtnText}
                  onBtnClick={handleAnswerBtnClick}
                  props={false}
                />
                <Button
                  icon="arrow-right"
                  className="is-success"
                  text={correctBtnText}
                  onBtnClick={handleAnswerBtnClick}
                  props={true}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sprint;
