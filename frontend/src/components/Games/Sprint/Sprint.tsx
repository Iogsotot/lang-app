import React, { useState, useEffect, FC } from 'react';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import Button from './Button';
import Streak from './Streak';
import ModalOnClose from './ModalOnClose';
import CloseButton from '../../CloseButton';
import GetReady from './GetReady';
import Frogs from './Frogs';
import PlayAudioButton from './PlayAudioButton';
import { shuffleArray, getRandomBooleanAnswer, randomInteger } from '../../../libs/random';
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
} = SPRINT;

const Sprint: FC = () => {
  const { words, page, group } = useTypedSelector(store => store.wordList);
  const { fetchWords } = useAction();
  const [sprintWords, setSprintWords] = useState(shuffleArray(words));
  const [streak, setStreak] = useState(0);
  const [IsPlaying, setIsPlaying] = useState(true);
  const [modalOnCloseIsActive, setModalOnCloseIsActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [getReadyIsPlaying, setGetReadyIsPlaying] = useState(true);
  const [points, setPoints] = useState(0);
  const [modificator, setModificator] = useState(1);
  const [pair, setPair] = useState({
    word: 'null',
    wordTranslate: 'null',
    audio: 'null',
    answer: false,
  });
  console.log(points, modificator);
  const addPoints = () => {
    setPoints(old => old + 10 * modificator);
  };

  const findWordPair = (): WordPair => {
    if (sprintWords.length < 1) {
      // тута запускаем сообщение о конце игры
      return pair;
    }
    const wordsList = sprintWords.slice(0);
    const word = wordsList.pop() as Word;

    setSprintWords(wordsList);

    if (getRandomBooleanAnswer()) {
      return {
        word: word.word,
        wordTranslate: word.wordTranslate,
        audio: word.audio,
        answer: true,
      };
    }

    const randomWordIndex = randomInteger(sprintWords.length - 2);
    return {
      word: word.word,
      wordTranslate: sprintWords[randomWordIndex].wordTranslate,
      audio: word.audio,
      answer: word.word === sprintWords[randomWordIndex].word,
    };
  };

  const handleModificator = () => {
    if (streak >= 3) {
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
      addPoints();
      handleModificator();
      animateBorderColor('.sprint__box', colorOnCorrectAnswer);
      setPair(findWordPair());
    } else {
      // wrong answer
      setStreak(0);
      setModificator(old => old - 1 || 1);
      animateBorderColor('.sprint__box', colorOnWrongAnswer);
    }
  };

  const handleArrowKeys = (event: KeyboardEvent) => {
    if (event.code === 'keyD' || event.code === 'ArrowRight') {
      handleAnswerBtnClick(true);
    } else if (event.code === 'keyA' || event.code === 'ArrowLeft') {
      handleAnswerBtnClick(false);
    }
  };

  useEffect(() => {
    setPair(findWordPair());
  }, []);

  useEffect(() => {
    fetchWords(page, group);
    setSprintWords(shuffleArray(words));
  }, [page, group]);

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
    window.location.href = '../';
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

          <div className="box sprint__box">
            <PlayAudioButton audio={audio} />
            <Streak streak={streak} isModMax={modificator === 4} />
            <Frogs modificator={modificator} maxFrogs={4} />
            <div className="sprint__game-wrapper">
              <div className="title">{word}</div>
              <div className="subtitle">{wordTranslate}</div>
              <div className="buttons">
                <Button className="is-danger" text={wrongBtnText} onBtnClick={handleAnswerBtnClick} props={false} />
                <Button className="is-success" text={correctBtnText} onBtnClick={handleAnswerBtnClick} props={true} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sprint;
