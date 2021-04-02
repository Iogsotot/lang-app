/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState, FC, useRef } from 'react';
import { connect } from 'react-redux';
import './savannah.scss';
import { SavannahProps } from './Savannah.model';
import { constants } from '../../../constants';
import { Word } from '../../../models/word';

// type DispatchProps = typeof settingActions;
type StateProps = {
  page: number;
  group: number;
  words: Word[];
  test: string;
};

const Savannah: FC<SavannahProps & StateProps> = props => {
  // @ts-ignore
  const dispatch: (any) => void = props.dispatch;
  console.log(props);
  const WORDS = [0, 1, 2, 3];
  const answerVariantsCount = 4;
  const maxCount = 6;
  const maxLives = 5;
  const allWordsInGroupCount = 600;

  const [lives, setLives] = useState(maxLives);
  const { WORD_GROUPS, API_BASE_URL } = constants;
  const [group, setGroup] = useState(0);
  const [currentWords, setCurrentWords] = useState<[Word] | []>([]);
  const [wordsChunk, setWordsChunk] = useState([0]);
  const [soughtIndex, setSoughtIndex] = useState(Math.floor(Math.random() * answerVariantsCount));
  const [round, setRound] = useState(1);
  const [isGetAnswer, setIsGetAnswer] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAswers, setWrongAswers] = useState(0);

  const [timer, setTimer] = useState(0);
  const [counter, setCounter] = useState(0);
  const [start, setStart] = useState(false);
  const currentWordClassNames = counter === 0 ? 'current-word' : 'current-word start-anim';

  useEffect(() => {
    const chunk = (() => {
      const wordsArr = [];
      while (wordsArr.length < answerVariantsCount) {
        const randomWordIndex = Math.floor(Math.random() * allWordsInGroupCount);
        if (wordsArr.indexOf(randomWordIndex) === -1) wordsArr.push(randomWordIndex);
      }
      return wordsArr;
    })();
    setSoughtIndex(Math.floor(Math.random() * answerVariantsCount));
    setWordsChunk(chunk);
  }, [round]);

  async function fetchWords(wordsGroup: number) {
    const response = await fetch(`${API_BASE_URL}/words/all?group=${wordsGroup}&amount=600`, {
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
      console.log({ currentPageWords });
      setCurrentWords(currentPageWords);
    }
    fetchCurrentPageWords();
  }, [group]);

  function gameOver() {
    console.log('game over');
    console.log({ wrongAswers });
    console.log({ correctAnswers });
    console.log({ lives });
  }

  function resolveAsWrongAnswer() {
    setLives(lives - 1);

    setWrongAswers(wrongAswers + 1);
    console.log('нэ маладэц');
    if (lives === 1) {
      gameOver();
    }
  }

  function resolveAsCorrectAnswer() {
    setCorrectAnswers(correctAnswers + 1);
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
      // console.log(timer);
      if (timer === 1) {
        setRound(round + 1);
        resolveAsWrongAnswer();
        resetGameRound();
        clearInterval(startTimerId);
        if (round === 30) {
          gameOver();
        }
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
          <button className="btn--start button is-primary is-outlined" onClick={handleStart}>
            Начать игру!
          </button>
        </div>
      )}
      {start && (
        <div className="savannah-body">
          <div className="status-bar box">
            <div>lives: {lives}</div>
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

const mapStateToProps = ({ gameData }: any) => {
  const { page, group, words, test } = gameData;
  const props: SavannahProps = {
    page,
    group,
    words,
    test,
  };
  return props;
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(mapStateToProps)(Savannah);
