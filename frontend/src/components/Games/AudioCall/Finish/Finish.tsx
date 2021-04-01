import { FC } from 'react';
import Word from '../Audiocall.model';
import { FinishProps } from './Finish.model';

const Finish: FC<FinishProps> = ({ correctAnswers, wrongAnswers, playAudio }) => {
  const CorrectWords = () => (
    <div>
      {correctAnswers.map(word =>
        <div className="finish__words-list__row">
          <button onClick={() => playAudio(word)} key={word.word} className="audiocall__volume ">
            <i className="fas fa-volume-up"></i>
          </button>
          <span>{word.word.toUpperCase()}</span>
          <span>{` - ${word.wordTranslate}`}</span>
        </div>)}
    </div>
  );

  return (
    <div className="audiocall">
      <div className="box finish">
        <div>Отличный результат!</div>
        <div>{`${correctAnswers.length} изучено, ${wrongAnswers.length} на изучении`}</div>
        <div className="finish__words-list">
          <div>
            <div>
              <span>Знаю</span>
              <span>{correctAnswers.length}</span>
            </div>
            <CorrectWords />
          </div>

          <div>
            <div>
              <span>Сложно</span>
              <span>{wrongAnswers.length}</span>
            </div>
            {wrongAnswers.map(word => (
              <div className="finish__words-list__row">
                <button onClick={() => playAudio(word)} key={word.word} className="audiocall__volume ">
                  <i className="fas fa-volume-up"></i>
                </button>
                <span>{word.word.toUpperCase()}</span>
                <span>{` - ${word.wordTranslate}`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Finish;
