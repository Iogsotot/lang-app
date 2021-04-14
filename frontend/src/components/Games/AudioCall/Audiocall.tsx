import React, { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Word } from '../../../models/word';
import Finish from '../Finish';
import ModalOnClose from '../ModalOnClose';
import Difficulty from '../Difficulty';
import { API_BASE_URL, AUDIO_CALL } from '../../../constants/constants';
import './Audiocall.scss';

const { gameName, gameDesc } = AUDIO_CALL;

const Audiocall: FC = () => {
  const [group, setGroup] = useState(0);
  const [modalOnCloseIsActive, setModalOnCloseIsActive] = useState(false);
  const [currentView, setCurrentView] = useState(false);
  const [start, setStart] = useState(false);

  const [words, setWords] = useState<Word[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<Word[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Word[]>([]);
  const [currentWordNumber, setCurrentWordNumber] = useState(-1);
  const [currentWord, setCurrentWord] = useState(words[currentWordNumber] || undefined);
  const [wordsVariants, setWordsVariants] = useState<string[]>([]);
  const [pressedButtonIdx, setPressedButtonIdx] = useState(-1);
  const [correctButtonIdx, setCorrectButtonIdx] = useState(-1);

  const startNewGame = () => {
    fetch(`${API_BASE_URL}/words/all?amount=10?group=${group}`)
      .then(res => res.json())
      .then(res => {
        setWords(res);
      });
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const shuffle = (array: string[]): string[] => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fetchVariants = () => {
    fetch(`${API_BASE_URL}/words/all?amount=4?group=${group}`)
      .then(res => res.json())
      .then(res => {
        const variants = [...res];
        variants.push(currentWord);
        const newWordsVariants = shuffle(variants.map(word => word?.wordTranslate));
        setWordsVariants(newWordsVariants);
      });
  };

  const playSound = (soundUrl: string) => {
    if (currentWordNumber >= 0) {
      const wordAudio = new Audio(soundUrl);
      wordAudio.play();
    }
  };

  useEffect(() => {
    setCurrentWord(words[currentWordNumber]);
  }, [currentWordNumber]);

  useEffect(() => {
    if (currentWordNumber < words.length) playSound(currentWord?.audio);
    fetchVariants();
    setCurrentView(false);
  }, [currentWord]);

  useEffect(() => {
    setCorrectButtonIdx(wordsVariants.indexOf(currentWord?.wordTranslate));
  }, [wordsVariants]);

  const nextWord = () => {
    if (currentWordNumber < words.length) setCurrentWordNumber(currentWordNumber + 1);
    setWordsVariants([]);
    setPressedButtonIdx(-1);
    setCorrectButtonIdx(-1);
  };

  const clickStart = () => {
    setStart(true);
    setCurrentWordNumber(0);
    fetchVariants();
  };

  const checkAnswer = (answer: string) => {
    setCurrentView(true);

    if (answer === currentWord.wordTranslate) {
      const updatedCorrectAnswers = [...correctAnswers, currentWord];
      setCorrectAnswers(updatedCorrectAnswers);
    } else {
      const updatedWrongAnswers = [...wrongAnswers, currentWord];
      setWrongAnswers(updatedWrongAnswers);
    }
  };

  const answerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLElement;
    checkAnswer(target.innerText);
    setPressedButtonIdx(wordsVariants.indexOf(target.innerText));
  };

  const dontKnowClick = () => {
    setCurrentView(true);
    const updatedWrongAnswers = [...wrongAnswers, currentWord];
    setWrongAnswers(updatedWrongAnswers);
  };

  const OpenCurrentWord = () => (
    <div className="audiocall__current-word">
      <div className="audiocall__current-word__img">
        <img src={currentWord.image} />
      </div>
      <button onClick={() => playSound(currentWord.audio)} className="audiocall__volume volume-button">
        <i className="fas fa-volume-up" />
      </button>
      <div className="audiocall__current-word__text">{currentWord.word}</div>
    </div>
  );

  const CloseCurrentWord = () => (
    <div className="audiocall__current-word">
      <button onClick={() => playSound(currentWord.audio)} className="audiocall__volume_main volume-button">
        <i className="fas fa-volume-up" />
      </button>
    </div>
  );

  const VariantsButtons = () => {
    const buttonClass = (inx: number) => {
      if (currentView) {
        if (inx === pressedButtonIdx && pressedButtonIdx !== correctButtonIdx) return 'button is-ghost wrong';
        if (inx === correctButtonIdx) return 'button is-ghost correct';
        return 'button is-ghost';
      }
      return 'button is-ghost';
    };

    return (
      <ul className="audiocall__answers__variants">
        {wordsVariants.map((item, index) => (
          <li key={wordsVariants[index] + 500} className="audiocall__answers__button">
            <button className={buttonClass(index)} disabled={currentView} onClick={e => answerClick(e)}>
              {wordsVariants[index]}
            </button>
            <span className="audiocall__hotKey">{`${index + 1}`}</span>
          </li>
        ))}
      </ul>
    );
  };

  const keyControls = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'Digit1':
      case 'Numpad1':
        checkAnswer(wordsVariants[0]);
        break;
      case 'Digit2':
      case 'Numpad2':
        checkAnswer(wordsVariants[1]);
        break;
      case 'Digit3':
      case 'Numpad3':
        checkAnswer(wordsVariants[2]);
        break;
      case 'Digit4':
      case 'Numpad4':
        checkAnswer(wordsVariants[3]);
        break;
      case 'Digit5':
      case 'Numpad5':
        checkAnswer(wordsVariants[4]);
        break;
      default:
    }
  };

  const enterKey = (e: KeyboardEvent) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      if (currentView) nextWord();
      else dontKnowClick();
    }
  };

  useEffect(() => {
    const setKeyContols = () => {
      window.addEventListener('keydown', keyControls);
    };
    setKeyContols();
    return () => window.removeEventListener('keydown', keyControls);
  }, [wordsVariants]);

  useEffect(() => {
    window.addEventListener('keydown', enterKey);
    return () => window.removeEventListener('keydown', enterKey);
  }, [currentView]);

  const handleSubmitClose = () => {
    window.location.href = '../';
  };

  const handleCancelModal = () => {
    setModalOnCloseIsActive(false);
  };

  const closeButtonClick = () =>
    (currentWordNumber < words.length ? setModalOnCloseIsActive(true) : handleSubmitClose());

  const currentLocation = useLocation();
  let previousLocation = '';
  if (currentLocation.state) {
    // eslint-disable-next-line prefer-destructuring
    previousLocation = currentLocation.state.from;
  }

  return (
    <section className="audiocall">
      <div className="overlay">
        <div
          className="btn--close"
          onClick={() => {
            closeButtonClick();
          }}
        >
          <i className="fal fa-times" />
        </div>
        <ModalOnClose
          modalIsActive={modalOnCloseIsActive}
          handleCancelModal={handleCancelModal}
          handleSubmitClose={handleSubmitClose}
        />
        {!start && <Difficulty title={gameName} desc={gameDesc} handleStart={clickStart} />}
        {start && currentWordNumber >= 0 && currentWordNumber < words.length && (
          <div className="audiocall_inner">
            <div>
              {currentView && <OpenCurrentWord />}
              {!currentView && <CloseCurrentWord />}
            </div>
            <div className="audiocall__answers">
              <VariantsButtons />

              {currentView && (
                <button className="button is-danger" onClick={nextWord}>
                  <i className="fas fa-angle-double-right" />
                </button>
              )}
              {!currentView && (
                <button className="button is-danger" onClick={dontKnowClick}>
                  Я не знаю
                </button>
              )}
            </div>
          </div>
        )}
        {start && currentWordNumber >= words.length && (
          <Finish correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} score={correctAnswers.length * 10} />
        )}
      </div>
    </section>
  );
};
export default Audiocall;
