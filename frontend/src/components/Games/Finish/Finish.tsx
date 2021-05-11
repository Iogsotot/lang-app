import { FC, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Word } from '../../../models/word';
import { FinishProps } from './Finish.model';
import 'react-tabs/style/react-tabs.css';
import './finish.scss';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { API_BASE_URL } from '../../../constants';

const Finish: FC<FinishProps> = ({ correctAnswers, wrongAnswers, score }) => {
  const history = useHistory();
  const wordSoundUrl = (word: Word) => `${word?.audio}`;
  const playSound = (soundUrl: string) => {
    const wordAudio = new Audio(soundUrl);
    wordAudio.play();
  };
  const store = useTypedSelector(commonStore => commonStore);
  const { userId, token } = store.user.user;
  const browserLocation = window.location.href.split('/');

  useEffect(() => {
    fetch(`${API_BASE_URL}/users/${userId}/statistics`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(res => res.json()).then(res => {
      const data = {
        learnedWords: res.learnedWords,
        optional: res.optional,
      };

      if (!res.learnedWords) {
        data.learnedWords = correctAnswers.length + wrongAnswers.length;
      } else {
        data.learnedWords = res.learnedWords + correctAnswers.length + wrongAnswers.length;
      }
      const date = new Date();
      const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      const location = browserLocation[browserLocation.length - 1];

      if (data.optional[dateString]) {
        res.optional[dateString][location].wrongAnswers++;
        res.optional[dateString][location].correctAnswers++;

        data.optional[dateString] = {};
        data.optional[dateString][location] = {
          wrongAnswers: wrongAnswers.length,
          correctAnswers: correctAnswers.length,
        };
      }

      const body = JSON.stringify(data);

      fetch(`${API_BASE_URL}/users/${userId}/statistics`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body,
      }).then(result => result.json()).then(result => {
        console.log(result);
      });
    });
  }, []);

  const finishList = (list: Word[]) => (
    <div>
      {list.map((word: Word) => (
        <div className="finish__words-list__row" key={word.word}>
          <button onClick={() => playSound(wordSoundUrl(word))} className="finish__volume volume-button">
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
    await history.push('/');
    window.location.hash = '#games';
  };

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
