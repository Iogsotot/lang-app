import { FC } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import Word from '../Audiocall.model';
import { FinishProps } from './Finish.model';

const Finish: FC<FinishProps> = ({ correctAnswers, wrongAnswers, playAudio }) => {
  const finishList = (list: Word[]) => (
    <div>
      {list.map((word: Word) => (
        <div className="finish__words-list__row">
          <button onClick={() => playAudio(word)} key={word.word} className="audiocall__volume volume-button">
            <i className="fas fa-volume-up"></i>
          </button>
          <span>{`${word.word.toUpperCase()} - ${word.wordTranslate}`}</span>
        </div>
      ))}
    </div>
  );

  const CorrectList = () => finishList(correctAnswers);

  const WrongList = () => finishList(wrongAnswers);

  return (
    <div className="audiocall">
      <div className="box finish">
        <div>Отличный результат!</div>
        <div>{`${correctAnswers.length} изучено, ${wrongAnswers.length} на изучении`}</div>

        <Scrollbars hideTracksWhenNotNeeded >
          <div className="finish__words-list">
            <div>
              <div>
                <span>Знаю</span>
                <span className="finish__akcent-number">{correctAnswers.length}</span>
              </div>
              <CorrectList />
            </div>

            <div>
              <div>
                <span>Сложно</span>
                <span className="finish__akcent-number">{wrongAnswers.length}</span>
              </div>
              <WrongList />
            </div>
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};
export default Finish;
