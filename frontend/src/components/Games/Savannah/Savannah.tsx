import './savannah.scss';
import { useState, FC } from 'react';
import { SavannahProps } from './Savannah.model';

const Savannah: FC<SavannahProps> = () => {
  const firtsWord = 'crocodile';
  const secondWord = 'duck';
  const trirdWord = 'snake';
  const fourthWord = 'cat';
  const currentWord = 'pterodactille';

  // const duration = 60;
  // const [time, setTimer] = useState(duration);
  // const start = Date.now();

  // const timer = setInterval(() => {
  //   const timeLast = Math.ceil(duration - (Date.now() - start) / 1000);
  //   setTimer(timeLast >= 0 ? timeLast : 0);
  //   if (timeLast >= 0) {
  //     setTimer(timeLast);
  //   } else {
  //     setTimer(0);
  //     // eslint-disable-next-line no-console
  //     console.log('я маленький коллбек');
  //     clearInterval(timer);
  //   }
  // }, 100);

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
            <a className="button is-info is-light">{firtsWord}</a>
            <a className="button is-info is-light">{secondWord}</a>
            <a className="button is-info is-light">{trirdWord}</a>
            <a className="button is-info is-light">{fourthWord}</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Savannah;
