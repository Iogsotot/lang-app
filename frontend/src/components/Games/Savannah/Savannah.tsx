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

  return (
    <section className="savannah">
      <div className="savannah-body">
        <div className="status-bar box">
          <div className="lives">
            <i className="fas fa-heart"></i>
            <i className="fas fa-heart"></i>
            <i className="fas fa-heart"></i>
            <i className="fas fa-heart"></i>
            <i className="far fa-heart"></i>
          </div>
          <div className="btn--close">
            <i className="far fa-times"></i>
          </div>
        </div>
        <div className="current-word title is-4 has-text-centered">{currentWord}</div>
        <div className="answer-variants box">
          <div className="wrapper">
            <a
              className="button is-info is-light"
              onClick={() => {
                setTime(true);
              }}
            >
              {firtsWord} {time}
            </a>
            <a
              className="button is-info is-light"
              onClick={() => {
                setTime(false);
              }}
            >
              {secondWord}
            </a>
            <a className="button is-info is-light">{trirdWord}</a>
            <a className="button is-info is-light">{fourthWord}</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Savannah;
