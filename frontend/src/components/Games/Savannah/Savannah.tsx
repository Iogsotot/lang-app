import React, { useCallback, useEffect, useState, FC, useRef } from 'react';
import { connect } from 'react-redux';
import './savannah.scss';
import { SavannahProps } from './Savannah.model';
import { WORD_GROUPS, API_BASE_URL } from '../../../constants';
import { Word } from '../../../models/word';
import gameDataActions from '../../../store/action-creators/gameDataActions';

type StateProps = {
  page: number;
  group: number;
  words: Word[];
  test: string;
};
type DispatchProps = typeof gameDataActions;

const mapDispatchToProps = gameDataActions;

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

const Savannah: FC<SavannahProps & StateProps & DispatchProps> = props => {
  const { setPage, addToActiveWords } = props;
  const answerVariantsCount = 4;
  const WORDS = [0, 1, 2, 3];
  const maxCount = 6;
  const maxLives = 5;
  const allWordsInGroupCount = 420;

  const [isFromTextbook, setIsFromTextbook] = useState(false);
  const [group, setGroup] = useState(0);
  const [currentWords, setCurrentWords] = useState<[Word] | []>([]);
  const [wordsChunk, setWordsChunk] = useState([0]);
  const [soughtIndex, setSoughtIndex] = useState(Math.floor(Math.random() * answerVariantsCount));
  const [round, setRound] = useState(1);

  const initialGameState = {
    lives: maxLives,
    correctAnswersCount: 0,
    wrongAswersCount: 0,
    point: 0,
  };
  const statsData = useRef(initialGameState);

  // welcome, game, stats
  const [gameScreen, setGameScreen] = useState('welcome');
  const [timer, setTimer] = useState(0);
  const [counter, setCounter] = useState(0);
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
      console.log('sdfsfsfsfsdfs');
      console.log({ currentPageWords });
      setCurrentWords(currentPageWords);
    }
    fetchCurrentPageWords();
  }, [group]);

  function resetGame() {
    setTimer(0);
    statsData.current = initialGameState;
  }

  function gameOver() {
    setGameScreen('stats');
    console.log('game over');
    console.log(statsData.current.wrongAswersCount);
    console.log(statsData.current.correctAnswersCount);
    console.log(statsData.current.lives);
    console.log(statsData.current.point);

    resetGame();
  }

  function resolveAsWrongAnswer() {
    let { lives } = statsData.current;
    let wrongAnswersCount = statsData.current.wrongAswersCount;
    wrongAnswersCount += 1;
    lives -= 1;
    statsData.current.lives = lives;
    statsData.current.wrongAswersCount = wrongAnswersCount;
    console.log(lives);

    console.log('нэ маладэц');
    if (lives === 0) {
      gameOver();
    }
  }

  function resolveAsCorrectAnswer() {
    let { correctAnswersCount } = statsData.current;
    correctAnswersCount += 1;
    statsData.current.correctAnswersCount = correctAnswersCount;
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
    if (gameScreen === 'game') {
      const startTimerId = setInterval(() => {
        setCounter(counter + 1);
        setTimer(timer - 1);
        addToActiveWords(currentWords[wordsChunk[soughtIndex]]);
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
    }
  }, [counter, timer]);

  const handleStart = useCallback(() => {
    setTimer(maxCount);
    setGameScreen('game');
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

  return (
    <section className="savannah">
      <div className="overlay"></div>
      <div
        className="btn--close"
        onClick={() => {
          resetGame();
          setGameScreen('welcome');
        }}
      >
        <i className="far fa-times" />
      </div>

      {gameScreen === 'welcome' && (
        <div className="savannah__info box">
          <h2 className="title is-2">Savannah</h2>
          <p>
            В этой игре на вас обрушится дождь из слов! к счастью слова падают по одной капельке. Ваша задача - успеть
            выбрать правильно слово до того, как оно упадёт. Удачи!
          </p>
          {!isFromTextbook && (
            <div className="difficulty-btn-block">
              <p>Сложность:</p>
              {Object.entries(WORD_GROUPS).map(([key, value]) => (
                <button
                  disabled={value === group}
                  key={key}
                  onClick={() => {
                    setGroup(value);
                  }}
                  className="button is-warning is-small"
                >
                  {key}
                </button>
              ))}
            </div>
          )}
          <button className="btn--start button is-primary is-outlined" onClick={handleStart}>
            Начать игру!
          </button>
        </div>
      )}
      {gameScreen === 'game' && (
        <div className="savannah-body">
          <div className="status-bar box">
            <div>lives: {statsData.current.lives}</div>
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

          <div className="answer-variants">
            <div className="wrapper">
              {WORDS.map(word => (
                <div className="button  is-primary is-outlined" onClick={() => checkPair(word)} key={word}>
                  {currentWords[wordsChunk[word]].word}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {gameScreen === 'stats' && (
        <div className="stats">
          <div className="stats__message">Конец игры</div>
          <button
            className="button  is-primary is-outlined"
            onClick={() => {
              setGameScreen('welcome');
              resetGame();
            }}
          >
            начать новую игру
          </button>
          <button
            className="button  is-primary is-outlined"
            onClick={() => {
              alert('sorry, not implemented');
            }}
          >
            вернуться на главный экран
          </button>
        </div>
      )}
    </section>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Savannah);
