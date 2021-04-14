import { useState, useEffect, FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import useSound from 'use-sound';

import onWrong from '../../../assets/audio/bonkSound.mp3';
import onCorrect from '../../../assets/audio/cratepop.mp3';
import onGameOver from '../../../assets/audio/happySound.mp3';
import onGameReady from '../../../assets/audio/bellSound.mp3';

import Finish from '../Finish';
import Button from './Button';
import Streak from './Streak';
import ModalOnClose from './ModalOnClose';
import CloseButton from '../../CloseButton';
import GetReady from './GetReady';
import Frogs from './Frogs';
import Checkbox from './Checkbox';
import ToggleButton from './ToggleButton';
import PlayAudioButton from './PlayAudioButton';
import Spinner from '../../Spinner';
import Difficulty from '../Difficulty';
import { getRandomBooleanAnswer, randomInteger } from '../../../libs/random';
import { compareAnswer } from '../../../libs/gameLogic';
import { animateBorderColor, modificator1248 } from '../../../libs/common';
import { Word } from '../../../models';
import { WordPair } from './Sprint.model';

import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useAction } from '../../../hooks/useAction';

import { SPRINT, INITIAL_WORD_STATE, INITIAL_PAIR_STATE } from '../../../constants';

import './Sprint.scss';

const {
  gameName,
  gameDesc,
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
  checkboxAuto,
} = SPRINT;

const Sprint: FC = () => {
  const history = useHistory();
  const [isLvlSelected, setLvlSelected] = useState(false);
  const [correctAnswerAudio] = useSound(onCorrect);
  const [wrongAnswerAudio] = useSound(onWrong);
  const [onGameOverAudio] = useSound(onGameOver);
  const [onGameReadyAudio] = useSound(onGameReady);
  const { words, group, page, loading } = useTypedSelector(store => store.wordList);
  const { fetchRandomWords } = useAction();
  const [sprintWords, setSprintWords] = useState(words);
  const [streak, setStreak] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [modalOnCloseIsActive, setModalOnCloseIsActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [getReadyIsPlaying, setGetReadyIsPlaying] = useState(true);
  const [points, setPoints] = useState(0);
  const [modificator, setModificator] = useState(1);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [currentWord, setCurrentWord] = useState<Word>(INITIAL_WORD_STATE);
  const [mistakesStat, setMistakesStat] = useState<Word[]>([]);
  const [correctAnswersStat, setCorrectAnswersStat] = useState<Word[]>([]);
  const [gameEnd, setGameEnd] = useState(false);
  const [pair, setPair] = useState(INITIAL_PAIR_STATE);

  const mod = basicPoints * modificator1248(modificator);

  const addPoints = () => setPoints(old => old + mod);
  const isAutoPlayAudio = () => ready && autoPlay && isLvlSelected;

  const currentLocation = useLocation();
  let previousLocation = '';
  if (currentLocation.state) {
    // eslint-disable-next-line prefer-destructuring
    previousLocation = currentLocation.state.from;
  }

  const handleGameOver = () => {
    if (!ready) {
      return;
    }
    if (isSoundOn) {
      onGameOverAudio();
    }
    setGameEnd(true);
    setIsPlaying(false);
  };

  const findWordPair = (): WordPair => {
    if (!words) {
      return INITIAL_PAIR_STATE;
    }
    if (sprintWords.length < 1) {
      handleGameOver();
      return INITIAL_PAIR_STATE;
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
    if (!isPlaying) return;
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
    if (isLvlSelected) {
      fetchRandomWords(group, page, wordsAmount);
    }
  }, [group, page, isLvlSelected]);

  useEffect(() => {
    if (!words || words.length === 0) {
      return;
    }
    setSprintWords(words);
    setPair(findWordPair());
  }, [words, ready]);
  useEffect(() => {
    if (ready) {
      onGameReadyAudio();
    }
  }, [ready]);

  useEffect(() => {
    document.addEventListener('keyup', handleArrowKeys);

    if (isAutoPlayAudio()) {
      new Audio(pair.audio).play();
    }

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

  const handleSubmitClose = () => history.push('/');

  const handleCancelModal = () => {
    if (ready) {
      setIsPlaying(true);
    } else {
      setGetReadyIsPlaying(true);
    }
    setModalOnCloseIsActive(false);
  };

  const setReadyCallback = () => setReady(true);

  const togglePause = () => setIsPlaying(old => !old);

  const toggleSound = () => setIsSoundOn(old => !old);

  const toggleAutoPlay = () => setAutoPlay(old => !old);

  const handleAnswerBtnClickTrue = () => handleAnswerBtnClick(true);
  const handleAnswerBtnClickFalse = () => handleAnswerBtnClick(false);

  const { word, wordTranslate, audio } = pair;
  const showFinishScreen = () => {
    if (!gameEnd) {
      return;
    }
    return <Finish correctAnswers={correctAnswersStat} wrongAnswers={mistakesStat} score={points} />;
  };
  const renderGameIfReady = () => {
    if (!isLvlSelected) {
      return <Difficulty title={gameName} desc={gameDesc} handleStart={() => setLvlSelected(true)} />;
    }
    if (loading) {
      return <Spinner />;
    }
    if (!ready) {
      return <GetReady isPlaying={getReadyIsPlaying} onComplete={setReadyCallback} />;
    }
    return (
      <>
        <div onClick={togglePause} className={`countdown-wrapper ${!isPlaying ? 'pause' : ''}`}>
          <CountdownCircleTimer
            onComplete={handleGameOver}
            size={timerSize}
            strokeWidth={timerStrokeWidth}
            isPlaying={isPlaying && !gameEnd}
            duration={gameDuration}
            colors={timerColor}
          >
            {({ remainingTime }) => (isPlaying ? remainingTime : null)}
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
                onBtnClick={handleAnswerBtnClickFalse}
              />
              <Button
                icon="arrow-right"
                className="is-success"
                text={correctBtnText}
                onBtnClick={handleAnswerBtnClickTrue}
              />
            </div>
          </div>
          <Checkbox labelText={checkboxAuto} callback={toggleAutoPlay} checked={autoPlay} />
        </div>
      </>
    );
  };

  return (
    <div className="sprint">
      <CloseButton callback={onCloseBtnClick} />
      <ModalOnClose
        modalIsActive={modalOnCloseIsActive}
        handleCancelModal={handleCancelModal}
        handleSubmitClose={handleSubmitClose}
      />
      {showFinishScreen() || renderGameIfReady()}
    </div>
  );
};

export default Sprint;
