import React, { useState, FC } from 'react';
// import SettingsScreen from './SettingsScreen';
import GameScreen from './GameScreen';
import { WORD_GROUPS } from '../../../constants/constants';
import ModalOnClose from '../ModalOnClose';
import CloseButton from '../../CloseButton';
import Finish from '../Finish';

const Puzzle: FC = () => {
  const [modalOnCloseIsActive, setModalOnCloseIsActive] = useState(false);
  const [isFromTextbook, setFromTextbook] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [group, setGroup] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const handleStart = () => {
    setGameActive(true);
  };
  const handleCancelModal = () => {
    setModalOnCloseIsActive(false);
  };
  const handleSubmitClose = () => {
    window.location.href = '../';
  };
  const closeButtonClick = () => {
    setModalOnCloseIsActive(true);
  };

  return (
    <section className="puzzle">
      <div className="overlay" />
      {gameFinished && (
        <Finish correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} score={correctAnswers.length * 10} />
      )}
      <ModalOnClose
        modalIsActive={modalOnCloseIsActive}
        handleCancelModal={handleCancelModal}
        handleSubmitClose={handleSubmitClose}
      />
      <div
        className="btn--close"
        onClick={() => {
          handleSubmitClose();
        }}
      >
        <i className="fal fa-times" />
      </div>
      {gameActive ? (
        <GameScreen
          setGameFinished={setGameFinished}
          setWrongAnswers={setWrongAnswers}
          setCorrectAnswers={setCorrectAnswers}
          group={group}
        />
      ) : (
        <div className="puzzle__info box">
          <h2 className="title is-2">Puzzle</h2>
          <p>
            В этой игре вы должны добавить правильное слово к фразе. Не знаю, зачем, но, может, вам так легче учить
            язык.
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
          <button className="btn button is-primary is-outlined" onClick={handleStart}>
            Начать игру!
          </button>
        </div>
      )}
    </section>
  );
};

export default Puzzle;
