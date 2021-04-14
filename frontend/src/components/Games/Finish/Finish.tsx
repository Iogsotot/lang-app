import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Word } from '../../../models/word';
import { FinishProps } from './Finish.model';
import 'react-tabs/style/react-tabs.css';
import './finish.scss';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { API_BASE_URL } from '../../../constants';
import { fetchUserWords, updateWord } from '../../../store/action-creators/words';

const Finish: FC<FinishProps> = ({ correctAnswers, wrongAnswers, score }) => {
  // const [loadedWords, setLoadedWords] = useState();
  const history = useHistory();
  const wordSoundUrl = (word: Word) => `https://rslang-2020q3.herokuapp.com/${word?.audio}`;
  const playSound = (soundUrl: string) => {
    const wordAudio = new Audio(soundUrl);
    wordAudio.play();
  };
  const store = useTypedSelector(commonStore => commonStore);
  const { userId, token } = store.user.user;
  const { words } = store.wordList;
  useEffect(() => {
    console.log(words);
  }, [words]);

  useEffect(() => {
    fetch(`https://rslang-2020q3.herokuapp.com/users/${userId}/aggregatedWords`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => res.json()).then(res => {
      const userWords = res[0].paginatedResults;
      console.log(userWords);
      console.log('he');
      userWords.forEach((el: any) => {
        const haveProp = Object.prototype.hasOwnProperty.call(el, 'userWord');
        if (haveProp) {
          console.log('i have that prop');
        } else {
          const body = JSON.stringify({
            stats: {
              wrongGameAnswersCount: 0,
              correctGameAnswersCount: 1,
            },
            learningStartDate: new Date(),
            isLearning: true,
          });
          updateWord(words, el, token, userId, el.id, body);
        }
      });
    });
    /*
    correctAnswers.forEach(async (el) => {
      await fetch(`${API_BASE_URL}/users/${userId}/words/${el.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          const startDate = res.learningStartDate ?? new Date();
          const body = JSON.stringify({
            isLearning: true,
            stats: {
              wrongGameAnswersCount: res.stats.wrongGameAnswersCount++,
            },
            learningStartDate: startDate,
          });
          fetch(`${API_BASE_URL}/users/${userId}/words/${el.id}`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body,
          })
            .then(result => result.json())
            .then(result => console.log(result));
        });
    });

     */
  }, []);

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
