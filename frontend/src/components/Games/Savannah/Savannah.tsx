import './savannah.scss';
import { FC, useState, useRef } from 'react';
import { SavannahProps } from './Savannah.model';

const Savannah: FC<SavannahProps> = () => {
  const firtsWord = 'crocodile';
  const secondWord = 'duck';
  const trirdWord = 'snake';
  const fourthWord = 'cat';
  const currentWord = 'pterodactille';

  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  countRef.current = count;

  const getCountTimeout = () => {
    setTimeout(() => {
      setCount(countRef.current);
      console.log(count);
    }, 2000);
  };

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
                getCountTimeout();
              }}
            >
              {firtsWord}
            </a>
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
