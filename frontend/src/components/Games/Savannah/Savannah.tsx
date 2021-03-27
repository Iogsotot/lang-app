/* eslint-disable */
import './savannah.scss';
import { FC, useState, useEffect, useRef } from 'react';
import { SavannahProps } from './Savannah.model';
import { constants } from '../../../constants';

const Savannah: FC<SavannahProps> = () => {
  const { WORD_GROUPS, API_BASE_URL } = constants;
  const [group, setGroup] = useState(0);
  const [page, setPage] = useState(0);
  const [currentWords, setCurrentWords] = useState([]);

  async function fetchWords(page: number, group: number) {
    const response = await fetch(`${API_BASE_URL}/words?group=${group}&page=${page}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(data => data.json().then(words => setCurrentWords(words)))
      .catch(error => {
        console.log(error);
      });
    return response;
  }

  const [time, setTime] = useState(false);
  const [start, setStart] = useState(false);
  let counter = 0;
  const maxCount = 3;
  const [startCountTimer, setStartCountTimer] = useState<number | null>(maxCount);

  useEffect(() => {
    fetchWords(page, group);
  }, [group, page]);

  useEffect(() => {
    console.log(currentWords);
  }, [currentWords]);

  useEffect(() => {
    if (!time) {
      return;
    }

    const timerId = setTimeout(() => {
      console.log('this is the end');
      setTime(false);
    }, 5150);

    return () => {
      clearTimeout(timerId);
    };
  }, [time]);

  useEffect(() => {
    if (!start) {
      return;
    }

    const startTimerId = setInterval(() => {
      console.log('tick ' + counter);
      counter += 1;

      setStartCountTimer(maxCount - counter);
      if (counter === 3) {
        setTime(true);
        clearTimeout(startTimerId);
        setStartCountTimer(null);
      }
    }, 1000);

    return () => {
      clearTimeout(startTimerId);
    };
  }, [start]);

  let currentWordClassNames = 'current-word';
  if (time) {
    currentWordClassNames += ' start-anim';
  }

  function resetGame() {
    setStart(false);
    setTime(false);
    setStartCountTimer(maxCount);
    counter = 0;
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
        <i className="far fa-times"></i>
      </div>

      {!start && (
        <div className="savannah__info box">
          <h2 className="title is-2">Savannah</h2>
          <p>
            In this game you will be able to repeat the learned words. You must have time to choose the correct
            translation of the word before it falls.
          </p>
          <div>
            <p>Groups</p>
            {Object.entries(WORD_GROUPS).map(([key, value]) => (
              <button disabled={value === group} key={key} onClick={() => setGroup(value)}>
                {key}
              </button>
            ))}
          </div>
          <a href="#" className="btn button is-primary is-outlined" onClick={() => setStart(true)}>
            Start game!
          </a>
        </div>
      )}
      {start && (
        <div className="savannah-body">
          <div className="status-bar box">
            <div className="lives">
              <i className="fas fa-heart"></i>
              <i className="fas fa-heart"></i>
              <i className="fas fa-heart"></i>
              <i className="fas fa-heart"></i>
              <i className="far fa-heart"></i>
            </div>
          </div>

          <div className="current-word__container title is-3 has-text-centered">
            <div className="timer--start">{startCountTimer}</div>
            <div className={currentWordClassNames}>{currentWords[0]['wordTranslate']}</div>
          </div>

          <div className="answer-variants box">
            <div className="wrapper">
              <a className="button is-info is-light">{currentWords[1]['word']}</a>
              <a className="button is-info is-light">{currentWords[0]['word']}</a>
              <a className="button is-info is-light">{currentWords[3]['word']}</a>
              <a className="button is-info is-light">{currentWords[4]['word']}</a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Savannah;
