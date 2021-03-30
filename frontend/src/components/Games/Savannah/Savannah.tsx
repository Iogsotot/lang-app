/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import React, { useCallback, useEffect, useState, FC, useRef } from 'react';
import './savannah.scss';
import { SavannahProps } from './Savannah.model';
import { constants } from '../../../constants';
import { Word } from '../../../models/word';

const Savannah: FC<SavannahProps> = () => {
  const { WORD_GROUPS, API_BASE_URL } = constants;
  const [group, setGroup] = useState(0);
  const [currentWords, setCurrentWords] = useState<[Word] | []>([]);

  const WORDS = [0, 1, 2, 3];
  const maxCount = 3;

  const wordsChunk = (() => {
    let wordsArr = [];
    while (wordsArr.length < 4) {
      let randomWordIndex = Math.floor(Math.random() * 600);
      if (wordsArr.indexOf(randomWordIndex) === -1) wordsArr.push(randomWordIndex);
    }
    return wordsArr;
  })();

  async function fetchWords(wordsGroup: number) {
    const response = await fetch(`${API_BASE_URL}/words/all?group=${wordsGroup}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(data => data.json())
      .catch(error => {
        console.log(error);
      });
    return response;
  }

  useEffect(() => {
    async function fetchCurrentPageWords() {
      const currentPageWords = await fetchWords(group);
      // console.log('-------------------------------------->');
      console.log(currentPageWords);
      setCurrentWords(currentPageWords);
    }
    fetchCurrentPageWords();
  }, [group]);

  let lives = 5;
  let isGetAnswer: boolean = false;
  let currentWordClassNames = 'current-word';

  const soughtIndex = Math.floor(Math.random() * 4);

  const [timer, setTimer] = useState(0);
  const [counter, setCounter] = useState(0);
  const [start, setStart] = useState(false);

  function resolveAsWrongAnswer() {
    if (isGetAnswer) {
      lives -= 1;
    }
    console.log('дурак что ли?');
  }

  function resolveAsCorrectAnswer() {
    isGetAnswer = true;
    console.log('маладэц');
  }

  const resetGameRound = useCallback(() => {
    setCounter(0);
    setTimer(5);
  }, []);

  useEffect(() => {
    if (!timer) {
      return;
    }

    const startTimerId = setInterval(() => {
      setCounter(counter + 1);
      setTimer(timer - 1);
      console.log(timer);
      if (timer === 1) {
        currentWordClassNames += ' start-anim';
        resolveAsWrongAnswer();
        resetGameRound();
        // setCounter(0);
        // setTimer(0);
        clearInterval(startTimerId);
      }
    }, 1000);

    return () => {
      clearTimeout(startTimerId);
    };
  }, [counter, timer]);

  const handleStart = useCallback(() => {
    setTimer(5);
    setStart(true);
  }, []);

  function checkPair(word: number) {
    resetGameRound();
    // setStart(false);
    // setTime(false);
    // setTime(true);
    // setStartCountTimer(maxCount);
    // counter = 0;
    if (word === soughtIndex) {
      resolveAsCorrectAnswer();
      return;
    }
    resolveAsWrongAnswer();
  }

  function resetGame() {
    setStart(false);
    // setTime(false);
    // setStartCountTimer(maxCount);
    // counter = 0;
  }

  return (
    <section className="savannah">
      <div className="overlay"></div>
      <div
        className="btn--close"
        onClick={() => {
          resetGame();
        }}
      >
        <i className="far fa-times" />
      </div>

      {!start && (
        <div className="savannah__info box">
          <h2 className="title is-2">Savannah</h2>
          <p>
            В этой игре на вас обрушится дождь из слов! к счастью слова падают по одной капельке. Ваша задача - успеть
            выбрать правильно слово до того, как оно упадёт. Удачи!
          </p>
          <div>
            <p>Сложность:</p>
            {Object.entries(WORD_GROUPS).map(([key, value]) => (
              <button
                disabled={value === group}
                key={key}
                onClick={() => {
                  setGroup(value);
                  setCurrentWords([]);
                }}
              >
                {key}
              </button>
            ))}
          </div>
          {/* <button className="btn button is-primary is-outlined" onClick={handleStart} disabled={!!timer}> */}
          <button className="btn button is-primary is-outlined" onClick={handleStart}>
            Начать игру!
          </button>
          {/* <div>counter: {counter}</div> */}
        </div>
      )}
      {start && (
        <div className="savannah-body">
          <div className="status-bar box">
            <div>counter: {counter}</div>
            {/* <button onClick={resetGameRound}>Перезапуск игры</button> */}
            <div className="lives">
              <i className="fas fa-heart"></i>
              <i className="fas fa-heart"></i>
              <i className="fas fa-heart"></i>
              <i className="fas fa-heart"></i>
              <i className="far fa-heart"></i>
            </div>
          </div>

          <div className="current-word__container title is-3 has-text-centered">
            {/* <div className="timer--start">{timer}</div> */}
            <div className={currentWordClassNames}>{currentWords[wordsChunk[soughtIndex]].wordTranslate}</div>
          </div>

          <div className="answer-variants box">
            <div className="wrapper">
              {WORDS.map(word => (
                <div className="button is-info is-light" onClick={() => checkPair(word)} key={word}>
                  {currentWords[wordsChunk[word]].word}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Savannah;
