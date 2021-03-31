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
  const [wordsChunk, setWordsChunk] = useState([0]);
  const [soughtIndex, setSoughtIndex] = useState(Math.floor(Math.random() * 4));
  const [round, setRound] = useState(1);
  const [isGetAnswer, setIsGetAnswer] = useState(false);

  const WORDS = [0, 1, 2, 3];
  const maxCount = 6;

  let lives = 5;
  let currentWordClassNames;
  const [timer, setTimer] = useState(0);
  const [counter, setCounter] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    // if (timer === 1) {
    const chunk = (() => {
      let wordsArr = [];
      while (wordsArr.length < 4) {
        let randomWordIndex = Math.floor(Math.random() * 600);
        if (wordsArr.indexOf(randomWordIndex) === -1) wordsArr.push(randomWordIndex);
      }
      return wordsArr;
    })();

    setWordsChunk(chunk);
    // }
  }, [round]);

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
      setCurrentWords(currentPageWords);
    }
    fetchCurrentPageWords();
  }, [group]);

  currentWordClassNames = counter === 0 ? 'current-word' : 'current-word start-anim';

  function resolveAsWrongAnswer() {
    if (isGetAnswer) {
      lives -= 1;
    }
    console.log('нэ маладэц');
  }

  function resolveAsCorrectAnswer() {
    // setIsGetAnswer(true);
    console.log('маладэц');
  }

  const resetGameRound = useCallback(() => {
    setCounter(0);
    setTimer(maxCount);
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
        // currentWordClassNames += ' start-anim';
        setRound(round + 1);
        resolveAsWrongAnswer();
        resetGameRound();
        clearInterval(startTimerId);
      }
    }, 1000);

    return () => {
      clearTimeout(startTimerId);
    };
  }, [counter, timer]);

  const handleStart = useCallback(() => {
    setTimer(maxCount);
    setStart(true);
  }, []);

  function checkPair(word: number) {
    setRound(round + 1);
    resetGameRound();
    if (word === soughtIndex) {
      resolveAsCorrectAnswer();
      return;
    }
    resolveAsWrongAnswer();
  }

  function resetGame() {
    setStart(false);
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
            <div className={currentWordClassNames} key={currentWords[wordsChunk[soughtIndex]].word}>
              {currentWords[wordsChunk[soughtIndex]].wordTranslate}
            </div>
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