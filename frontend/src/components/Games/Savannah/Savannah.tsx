/* eslint-disable no-nested-ternary */
import { useCallback, useEffect, useState, FC, useRef } from 'react';
import useSound from 'use-sound';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { SavannahProps } from './Savannah.model';
import { SAVANNAH, API_BASE_URL } from '../../../constants';
import ModalOnClose from '../ModalOnClose';
import Difficulty from '../Difficulty';
import Finish from '../Finish';
import Spinner from '../../Spinner';
import { Word } from '../../../models/word';
import gameDataActions from '../../../store/action-creators/gameDataActions';
import './savannah.scss';
import successSound from '../../../assets/audio/pew.mp3';
import failureSound from '../../../assets/audio/failure.mp3';
import winSound from '../../../assets/audio/victory.mp3';
import startGameSound from '../../../assets/audio/bellSound.mp3';

const { gameName, gameDesc } = SAVANNAH;

type StateProps = {
  page: number;
  group: number;
  words: Word[];
  test: string;
};
type DispatchProps = typeof gameDataActions;

const mapDispatchToProps = gameDataActions;

const mapStateToProps = ({ gameData, wordList }: any) => {
  const { page, group } = gameData;
  const { words } = wordList;

  const props: SavannahProps = {
    page,
    group,
    words,
  };
  return props;
};

const Savannah: FC<SavannahProps & StateProps & DispatchProps> = props => {
  const { addToActiveWords } = props;
  const { words } = props;

  const [modalOnCloseIsActive, setModalOnCloseIsActive] = useState(false);
  const answerVariantsCount = 4;
  const WORDS = [0, 1, 2, 3];
  const maxCount = 6;
  const maxLives = 5;
  const maxRound = 30;

  const currentLocation = useLocation();
  let previousLocation = '';
  if (currentLocation.state) {
    // eslint-disable-next-line prefer-destructuring
    previousLocation = currentLocation.state.from;
  }

  const [group] = useState(0);
  const [currentWords, setCurrentWords] = useState<Word[]>([]);
  const [wordsChunk, setWordsChunk] = useState([0]);
  const [soughtIndex, setSoughtIndex] = useState(Math.floor(Math.random() * answerVariantsCount));
  const [round, setRound] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState<Word[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Word[]>([]);
  const [loading, setLoading] = useState('');
  const [gameFinishPoints, setGameFinishPoints] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [correctAnswerSeries, setCorrectAnswerSeries] = useState<string[]>([]);
  const [longestWinStreak, setLongestWinStreak] = useState<number>(0);
  const [bgPosition, setBgPosition] = useState('100%');
  const [crystalHeight, setCrystalHeight] = useState('4rem');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [playSuccess] = useSound(successSound);
  const [playFailure] = useSound(failureSound);
  const [playStartGameSound] = useSound(startGameSound);
  const [playWin] = useSound(winSound);

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

  const closeButtonClick = () => (round < maxRound ? setModalOnCloseIsActive(true) : handleSubmitClose());
  const statsData = useRef(initialGameState);

  // welcome, game, stats
  const [gameScreen, setGameScreen] = useState('welcome');
  const [timer, setTimer] = useState(0);
  const [counter, setCounter] = useState(0);
  const currentWordClassNames = counter === 0 ? 'current-word' : 'current-word start-anim';

  useEffect(() => {
    if (currentWords.length > 0) {
      const chunk = (() => {
        const wordsArr = [];
        while (wordsArr.length < answerVariantsCount) {
          const randomWordIndex = Math.floor(Math.random() * currentWords.length);
          if (wordsArr.indexOf(randomWordIndex) === -1) wordsArr.push(randomWordIndex);
        }
        return wordsArr;
      })();
      setSoughtIndex(Math.floor(Math.random() * answerVariantsCount));
      setWordsChunk(chunk);
    }
  }, [round, currentWords]);

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

  useEffect(() => {
    async function fetchCurrentPageWords() {
      const currentPageWords = await fetchWords(group);
      setCurrentWords(currentPageWords);
      setLoading('done');
    }
    if (previousLocation !== 'dictionary' && previousLocation !== 'textbook') {
      fetchCurrentPageWords();
    } else {
      setCurrentWords(words);
    }
  }, [group]);

  useEffect(() => {
    if (currentWords.length >= 1) {
      setLoading('done');
    }
  }, [currentWords]);

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
    if (soundEnabled) {
      playStartGameSound();
    }
    if (loading !== 'done') {
      setLoading('start');
      setGameScreen('');
    }
    setGameStart(true);
  }

  function gameOver() {
    if (soundEnabled) {
      playWin();
    }
    setGameScreen('stats');
    setGameFinishPoints(statsData.current.point);
    resetGame();
  }

  function resolveAsWrongAnswer() {
    if (soundEnabled) {
      playFailure();
    }

    if (correctAnswerSeries.length >= longestWinStreak) { setLongestWinStreak(correctAnswerSeries.length); }
    setCorrectAnswerSeries([]);
    const updatedWrongAnswers = [...wrongAnswers, currentWords[wordsChunk[soughtIndex]]];
    setWrongAnswers(updatedWrongAnswers);
    let { lives } = statsData.current;
    let wrongAnswersCount = statsData.current.wrongAswersCount;
    wrongAnswersCount += 1;
    lives -= 1;
    statsData.current.lives = lives;
    statsData.current.wrongAswersCount = wrongAnswersCount;

    if (lives === 0) {
      gameOver();
    }
  }

  function resolveAsCorrectAnswer() {
    if (soundEnabled) {
      playSuccess();
    }
    let bgModificator = '0%';
    if (statsData.current.correctAnswersCount <= 33) {
      bgModificator = `${100 - statsData.current.correctAnswersCount * 3}%`;
    }
    setBgPosition(bgModificator);

    if (statsData.current.correctAnswersCount <= 5) {
      const crystalModificator = `${4 + statsData.current.correctAnswersCount / 2}rem`;
      setCrystalHeight(crystalModificator);
    }

    const updatedCorrectAnswers = [...correctAnswers, currentWords[wordsChunk[soughtIndex]]];
    setCorrectAnswers(updatedCorrectAnswers);
    let { correctAnswersCount } = statsData.current;
    correctAnswersCount += 1;
    statsData.current.correctAnswersCount = correctAnswersCount;
    const updatedCorrectAnswerSeries = [...correctAnswerSeries, 'piy'];
    setCorrectAnswerSeries(updatedCorrectAnswerSeries);

    statsData.current.point += addPoints();
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

  const keyControls = (e: KeyboardEvent) => {
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

  return (
    <section className="savannah" style={{ backgroundPositionY: bgPosition }}>
      <ModalOnClose
        modalIsActive={modalOnCloseIsActive}
        handleCancelModal={handleCancelModal}
        handleSubmitClose={handleSubmitClose}
      />
      <div className="overlay"></div>
      <div className="btn--sound" onClick={() => setSoundEnabled(!soundEnabled)}>
        {soundEnabled && <i className="fal fa-volume-up" />}
        {!soundEnabled && <i className="fal fa-volume-slash" />}
      </div>
      <div
        className="btn--close"
        onClick={() => {
          closeButtonClick();
        }}
      >
        <i className="fal fa-times" />
      </div>

      {gameScreen === 'welcome' && (
        <Difficulty
          title={gameName}
          desc={gameDesc}
          handleStart={() => {
            handleStartGame();
          }}
        />
      )}
      {loading === 'start' && <Spinner />}
      {gameScreen === 'game' && (
        <div className="savannah-body">
          <div className="status-bar">
            <div className="lives">
              {[...Array(statsData.current.lives)].map((item, index) => (
                <i className="fas fa-heart" key={index}/>
              ))}
              {[...Array(5 - statsData.current.lives)].map((item, index) => (
                <i className="far fa-heart" key={index}/>
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
                <div className="button  is-primary is-outlined btn-answers" onClick={() => checkPair(word)} key={word}>
                  {currentWords[wordsChunk[word]].word}
                </div>
              ))}
            </div>
          </div>
          <div className="crystal-block">
            <div className="crystal crystal-anim" style={{ height: crystalHeight }} />
          </div>
        </div>
      )}

      {gameScreen === 'stats' && (
        <Finish correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} score={gameFinishPoints} />
      )}
    </section>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Savannah);
