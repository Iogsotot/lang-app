import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Word } from '../../../models/word';
import { FinishProps } from './Finish.model';
import 'react-tabs/style/react-tabs.css';
import './finish.scss';
import { useAction } from '../../../hooks/useAction';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

const Finish: FC<FinishProps> = ({ correctAnswers, wrongAnswers, score }) => {
  const history = useHistory();
  const { setStats } = useAction();
  const store = useTypedSelector(commonStore => commonStore);
  const { stats } = store.wordList;
  const wordSoundUrl = (word: Word) => `https://rslang-2020q3.herokuapp.com/${word?.audio}`;
  const playSound = (soundUrl: string) => {
    const wordAudio = new Audio(soundUrl);
    wordAudio.play();
  };

  const finishList = (list: Word[]) => (
    <div>
      {list.map((word: Word) => (
        <div className="finish__words-list__row" key={word.word}>
          <button onClick={() => playSound(wordSoundUrl(word))} className="audiocall__volume volume-button">
            <i className="fas fa-volume-up" />
          </button>
          <span>{`${word.word.toUpperCase()} - ${word.wordTranslate}`}</span>
        </div>
      ))}
    </div>
  );

  const CorrectList = () => finishList(correctAnswers);

  const WrongList = () => finishList(wrongAnswers);

  const handleReturnToGameList = async () => {
    // нужно разобраться как правильно обрабатывать хэши с помощью useHistory
    await history.push('/');
    window.location.hash = '#games';
  };

  useEffect(() => {
    setStats(stats || [], correctAnswers || [], true);
  }, []);

  useEffect(() => {
    setStats(stats || [], wrongAnswers || [], false);
  }, []);

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-content">
        <div className="box finish">
          <Tabs>
            <TabList>
              <Tab>
                <i className="fas fa-circle" />
              </Tab>
              <Tab>
                <i className="fas fa-circle" />
              </Tab>
            </TabList>

            <TabPanel>
              <div className="finish__title">Отличный результат!</div>
              <div className="subtitle">{`${correctAnswers.length} изучено, ${wrongAnswers.length} на изучении`}</div>
              <div className="finish__score">{`+${score}`}</div>
              <div className="finish__btns">
                <button onClick={() => window.location.reload()} className="button is-primary finish__btn">
                  Сыграть еще раз
                </button>
                <button onClick={handleReturnToGameList} className="button is-link finish__btn">
                  К списку игр
                </button>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="finish__tab-inner">
                <Scrollbars hideTracksWhenNotNeeded>
                  <div className="finish__words-list">
                    <div>
                      <div>
                        <span>Знаю</span>
                        <span className="finish__akcent-number good">{correctAnswers.length}</span>
                      </div>
                      <CorrectList />
                    </div>

                    <div className="divider"></div>

                    <div>
                      <div>
                        <span>Сложно</span>
                        <span className="finish__akcent-number bad">{wrongAnswers.length}</span>
                      </div>
                      <WrongList />
                    </div>
                  </div>
                </Scrollbars>
              </div>
            </TabPanel>
          </Tabs>
        </div>
        <button onClick={handleReturnToGameList} className="modal-close is-large" aria-label="close"></button>
      </div>
    </div>
  );
};
export default Finish;
