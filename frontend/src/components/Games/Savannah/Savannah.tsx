/* eslint-disable no-nested-ternary */
import { useCallback, useEffect, useState, FC, useRef } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { SavannahProps } from './Savannah.model';
import { WORD_GROUPS, API_BASE_URL } from '../../../constants';
import ModalOnClose from '../ModalOnClose';
import Finish from '../Finish';
import Spinner from '../../Spinner';
import { Word } from '../../../models/word';
import gameDataActions from '../../../store/action-creators/gameDataActions';
import './savannah.scss';

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
  const [modalOnCloseIsActive, setModalOnCloseIsActive] = useState(false);
  const answerVariantsCount = 4;
  const WORDS = [0, 1, 2, 3];
  const maxCount = 6;
  const maxLives = 5;
  const maxRound = 30;
  const allWordsInGroupCount = 600;

  const currentLocation = useLocation();
  let previousLocation = '';
  if (currentLocation.state) {
    // eslint-disable-next-line prefer-destructuring
    previousLocation = currentLocation.state.from;
  }

  const [group, setGroup] = useState(0);
  const [currentWords, setCurrentWords] = useState<Word[]>([]);
  const [wordsChunk, setWordsChunk] = useState([0]);
  const [soughtIndex, setSoughtIndex] = useState(Math.floor(Math.random() * answerVariantsCount));
  const [round, setRound] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState<Word[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Word[]>([]);
  const [loading, setLoading] = useState('');
  const [gameFinishPoints, setGameFinishPoints] = useState(0);
  // const [readyGameCounter, setReadyGameCounter] = useState<number>();
  const [gameStart, setGameStart] = useState(false);
  // let correctAnswerSeries: string[] = [];
  const [correctAnswerSeries, setCorrectAnswerSeries] = useState<string[]>([]);

  const initialGameState = {
    lives: maxLives,
    correctAnswersCount: 0,
    wrongAswersCount: 0,
    point: 0,
  };

  const handleCancelModal = () => {
    setModalOnCloseIsActive(false);
  };

  const handleSubmitClose = () => {
    window.location.href = '../';
  };

  const closeButtonClick = () =>
    (round < maxRound ? setModalOnCloseIsActive(true) : handleSubmitClose());
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

  const startGame = useCallback(() => {
    setTimer(maxCount);
    setGameScreen('game');
  }, []);

  // useEffect(() => {
  //   if (!timer) {
  //     return;
  //   }
  //   if (gameScreen === 'game') {
  //     const startTimerId = setInterval(() => {
  //       setReadyGameCounter(counter + 1);
  //       if (readyGameCounter === 3) {
  //         startGame();
  //       }
  //     }, 1000);
  //     return () => {
  //       clearTimeout(startTimerId);
  //     };
  //   }
  // }, [readyGameCounter]);

  useEffect(() => {
    async function fetchCurrentPageWords() {
      const currentPageWords = await fetchWords(group);
      console.log({ currentPageWords });
      setCurrentWords(currentPageWords);
      setLoading('done');
      // setReadyGameCounter(3);
    }
    fetchCurrentPageWords();
  }, [group]);

  useEffect(() => {
    if (loading === 'done' && gameStart) {
      setGameScreen('game');
      startGame();
    }
  }, [loading, gameStart]);

  function addPoints() {
    const basicPoints = 10;
    let points = basicPoints;
    if (correctAnswerSeries.length > 0) {
      const { length } = correctAnswerSeries;
      if (length === 1) points = basicPoints * 2;
      if (length === 2) points = basicPoints * 3;
      if (length === 3) points = basicPoints * 4;
      if (length === 4) points = basicPoints * 5;
      if (length >= 5) points = basicPoints * 6;
    }
    return points;
  }

  function resetGame() {
    setGameStart(false);
    setTimer(0);
    statsData.current = initialGameState;
  }

  function handleStartGame() {
    if (loading !== 'done') {
      setLoading('start');
      setGameScreen('');
    }
    setGameStart(true);
  }

  function gameOver() {
    setGameScreen('stats');
    setGameFinishPoints(statsData.current.point);
    // console.log('game over');
    // console.log(statsData.current.wrongAswersCount);
    // console.log(statsData.current.correctAnswersCount);
    // console.log(statsData.current.lives);
    console.log(statsData.current.point);
    console.log(correctAnswerSeries);

    resetGame();
  }

  function resolveAsWrongAnswer() {
    // звук правильного ответа
    console.log('deleted array');

    setCorrectAnswerSeries([]);
    const updatedWrongAnswers = [...wrongAnswers, currentWords[wordsChunk[soughtIndex]]];
    setWrongAnswers(updatedWrongAnswers);
    let { lives } = statsData.current;
    let wrongAnswersCount = statsData.current.wrongAswersCount;
    wrongAnswersCount += 1;
    lives -= 1;
    statsData.current.lives = lives;
    statsData.current.wrongAswersCount = wrongAnswersCount;
    // console.log(lives);

    // console.log('нэ маладэц');
    if (lives === 0) {
      gameOver();
    }
  }

  function resolveAsCorrectAnswer() {
    const updatedCorrectAnswers = [...correctAnswers, currentWords[wordsChunk[soughtIndex]]];
    setCorrectAnswers(updatedCorrectAnswers);
    let { correctAnswersCount } = statsData.current;
    correctAnswersCount += 1;
    statsData.current.correctAnswersCount = correctAnswersCount;
    const updatedCorrectAnswerSeries = [...correctAnswerSeries, 'piy'];
    setCorrectAnswerSeries(updatedCorrectAnswerSeries);

    console.log(correctAnswerSeries);

    statsData.current.point += addPoints();
    console.log(statsData.current.point);

    // console.log('маладэц');
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
          if (round === maxRound) {
            gameOver();
          }
        }
      }, 1000);
      return () => {
        clearTimeout(startTimerId);
      };
    }
  }, [counter, timer]);

  function checkPair(word: number) {
    setRound(round + 1);
    resetGameRound();
    if (word === soughtIndex) {
      resolveAsCorrectAnswer();
      return;
    }
    resolveAsWrongAnswer();
  }

  const keyControls = (e: any) => {
    switch (e.code) {
      case 'Digit1':
      case 'Numpad1':
        checkPair(0);
        break;
      case 'Digit2':
      case 'Numpad2':
        checkPair(1);
        break;
      case 'Digit3':
      case 'Numpad3':
        checkPair(2);
        break;
      case 'Digit4':
      case 'Numpad4':
        checkPair(3);
        break;
      default:
    }
  };

  useEffect(() => {
    const setKeyControls = () => {
      window.addEventListener('keydown', keyControls);
    };
    setKeyControls();
    return () => window.removeEventListener('keydown', keyControls);
  }, [round]);

  function handleClose() {
    if (gameScreen === 'welcome') {
      window.location.href = '../';
    }
    resetGame();
    setGameScreen('welcome');
  }

  return (
    <section className="savannah">
      <ModalOnClose
        modalIsActive={modalOnCloseIsActive}
        handleCancelModal={handleCancelModal}
        handleSubmitClose={handleSubmitClose}
      />
      <div className="overlay">
        <div
          className="btn--close"
          onClick={() => {
            closeButtonClick();
          }}
        >
          <i className="fal fa-times" />
        </div>
      </div>

      {gameScreen === 'welcome' && (
        <div className="savannah__info box">
          <h2 className="title is-2">Savannah</h2>
          <p>
            В этой игре на вас обрушится дождь из слов! к счастью слова падают по одной капельке. Ваша задача - успеть
            выбрать правильно слово до того, как оно упадёт. Удачи!
          </p>
          {previousLocation !== 'textbook' && (
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
          <button className="btn--start button is-primary is-outlined" onClick={() => { handleStartGame(); }}>
            Начать игру!
          </button>
        </div>
      )}
      {loading === 'start' && <Spinner/>}
      {gameScreen === 'game' &&
        (
          <div className="savannah-body">
            <div className="status-bar box">
              <div className="lives">
                {[...Array(statsData.current.lives)].map(() => (
                  <i className="fas fa-heart"/>
                ))}
                {[...Array(5 - statsData.current.lives)].map(() => (
                  <i className="far fa-heart"/>
                ))}
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
        )
      }

      {gameScreen === 'stats' && (
        <Finish correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} score={gameFinishPoints} />
      )}
    </section>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Savannah);
