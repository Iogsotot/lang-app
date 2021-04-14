import { useState, FC } from 'react';
import { useLocation } from 'react-router-dom';
import GameScreen from './GameScreen';
import { PUZZLE } from '../../../constants/constants';
import ModalOnClose from '../ModalOnClose';
import Difficulty from '../Difficulty';
import Finish from '../Finish';

const { gameName, gameDesc } = PUZZLE;

const Puzzle: FC = () => {
  const [modalOnCloseIsActive, setModalOnCloseIsActive] = useState(false);
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

  const currentLocation = useLocation();
  let previousLocation = '';
  if (currentLocation.state) {
    // eslint-disable-next-line prefer-destructuring
    previousLocation = currentLocation.state.from;
  }

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

      {gameActive && !gameFinished ? (
        <GameScreen
          setGameFinished={setGameFinished}
          setWrongAnswers={setWrongAnswers}
          setCorrectAnswers={setCorrectAnswers}
          group={group}
        />
      ) : (
        <Difficulty title={gameName} desc={gameDesc} handleStart={handleStart} />
      )}
    </section>
  );
};

export default Puzzle;
