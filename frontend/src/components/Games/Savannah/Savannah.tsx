/* eslint-disable */
import './savannah.scss';
import { FC, useState, useEffect, useRef } from 'react';
import { SavannahProps } from './Savannah.model';

const Savannah: FC<SavannahProps> = () => {
  const firtsWord = 'crocodile';
  const secondWord = 'duck';
  const trirdWord = 'snake';
  const fourthWord = 'cat';
  const currentWord = 'pterodactille';

  const [time, setTime] = useState(false);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!time) {
      return;
    }

    const timerId = setTimeout(() => {
      console.log('this is the end');
      setTime(false);
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [time]);

  useEffect(() => {
    let startCountTimer = 0;
    if (!start) {
      return;
    }

    const startTimerId = setInterval(() => {
      console.log('tick');
      startCountTimer += 1;
      if (startCountTimer === 3) {
        setTime(true);
        clearTimeout(startTimerId);
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

  return (
    <section className="savannah">
      <div className="overlay"></div>
      <div className="btn--close" onClick={() => setStart(false)}>
        <i className="far fa-times"></i>
      </div>

      {!start && (
        <div className="savannah__info box">
          <h2 className="title is-2">Savannah</h2>
          <p>
            In this game you will be able to repeat the learned words. You must have time to choose the correct
            translation of the word before it falls.
          </p>
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
            <div className={currentWordClassNames}>{currentWord}</div>
          </div>

          <div className="answer-variants box">
            <div className="wrapper">
              <a className="button is-info is-light">
                {firtsWord} {time}
              </a>
              <a className="button is-info is-light">{secondWord}</a>
              <a className="button is-info is-light">{trirdWord}</a>
              <a className="button is-info is-light">{fourthWord}</a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Savannah;
