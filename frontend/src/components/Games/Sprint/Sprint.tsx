import React, { useState, useEffect, FC } from 'react';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import Button from './Button';
import Streak from './Streak';
import ModalOnClose from './ModalOnClose';
import CloseButton from '../../CloseButton';
import GetReady from './GetReady';
import { shuffleArray, getRandomBooleanAnswer, randomInteger } from '../../../libs/random';
import { compareAnswer } from '../../../libs/gameLogic';
import { animateBorderColor } from '../../../libs/common';
import { WordsProps, Word } from '../../../models';
import { WordPair } from './Sprint.model';

import './Sprint.scss';

const Sprint: FC<WordsProps> = ({ words }) => {
  const [sprintWords, setSprintWords] = useState(shuffleArray(words));
  const [streak, setStreak] = useState(0);
  const [IsPlaying, setIsPlaying] = useState(true);
  const [modalOnCloseIsActive, setModalOnCloseIsActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [getReadyIsPlaying, setGetReadyIsPlaying] = useState(true);
  const [pair, setPair] = useState({
    word: 'null',
    wordTranslate: 'null',
    answer: false,
  });

  const findWordPair = ():WordPair => {
    if (sprintWords.length < 1) {
      // тута запускаем сообщение о конце игры
      return pair;
    }
    const wordsList = sprintWords.slice(0);
    const word = wordsList.pop() as Word;

    setSprintWords(wordsList);

    return getRandomBooleanAnswer() ?
      {
        word: word.word,
        wordTranslate: word.wordTranslate,
        answer: true }
      : {
        word: word.word,
        wordTranslate: sprintWords[randomInteger(sprintWords.length - 2)].wordTranslate,
        answer: false,
      };
  };

  useEffect(() => {
    setPair(findWordPair());
  }, []);

  const handleAnswerBtnClick = (arg:boolean):void => {
    if (compareAnswer(arg, pair.answer)) {
      // correct answer
      setStreak((old) => old + 1);
      animateBorderColor('.sprint__box', '141, 71%, 48%');
    } else {
      // wrong answer
      setStreak(0);
      animateBorderColor('.sprint__box', '348, 100%, 61%');
    }
    setPair(findWordPair());
  };

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

  const { word, wordTranslate } = pair;
  return (
    <div className="sprint">
      <CloseButton callback={onCloseBtnClick} />
      <ModalOnClose
        modalIsActive={modalOnCloseIsActive}
        handleCancelModal={handleCancelModal}
        handleSubmitClose={handleSubmitClose}
      />
      {!ready ?
        <GetReady isPlaying={getReadyIsPlaying} onComplete={setReadyCallback}/> :
        <>
          <div className="countdown-wrapper">
            <CountdownCircleTimer
              onComplete={() => console.log('помогите, я застрял в коллбеке')}
              size={80}
              strokeWidth={3}
              isPlaying={IsPlaying}
              duration={60}
              colors={'#00d1b2'}>
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
          </div>

          <div className='box sprint__box'>
            <Streak streak={streak}/>
            <div className="sprint__game-wrapper">
              <div className="title">{word}</div>
              <div className="subtitle">{wordTranslate}</div>
              <div className="buttons">
                <Button className="is-danger" text="Wrong" onBtnClick={handleAnswerBtnClick} props={false}/>
                <Button className="is-success" text="Correct" onBtnClick={handleAnswerBtnClick} props={true}/>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default Sprint;
