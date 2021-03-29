import { FC } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Sprint from './components/Games/Sprint';
import './App.scss';

import TextBook from './components/Textbook';
import PromoPage from './components/PromoPage';
import { index } from './store';

const words = [
  {
    group: 0,
    page: 0,
    word: 'alcohol',
    image: 'files/01_0002.jpg',
    audio: 'files/01_0002.mp3',
    audioMeaning: 'files/01_0002_meaning.mp3',
    audioExample: 'files/01_0002_example.mp3',
    textMeaning: '<i>Alcohol</i> is a type of drink that can make people drunk.',
    textExample: 'A person should not drive a car after he or she has been drinking <b>alcohol</b>.',
    transcription: '[ǽlkəhɔ̀ːl]',
    textExampleTranslate: 'Человек не должен водить машину после того, как он выпил алкоголь',
    textMeaningTranslate: 'Алкоголь - это тип напитка, который может сделать людей пьяными',
    wordTranslate: 'алкоголь',
  },
  {
    group: 0,
    page: 0,
    word: 'boat',
    image: 'files/01_0005.jpg',
    audio: 'files/01_0005.mp3',
    audioMeaning: 'files/01_0005_meaning.mp3',
    audioExample: 'files/01_0005_example.mp3',
    textMeaning: 'A <i>boat</i> is a vehicle that moves across water.',
    textExample: 'There is a small <b>boat</b> on the lake.',
    transcription: '[bout]',
    textExampleTranslate: 'На озере есть маленькая лодка',
    textMeaningTranslate: 'Лодка - это транспортное средство, которое движется по воде',
    wordTranslate: 'лодка',
  },
  {
    group: 0,
    page: 0,
    word: 'agree',
    image: 'files/01_0001.jpg',
    audio: 'files/01_0001.mp3',
    audioMeaning: 'files/01_0001_meaning.mp3',
    audioExample: 'files/01_0001_example.mp3',
    textMeaning: 'To <i>agree</i> is to have the same opinion or belief as another person.',
    textExample: 'The students <b>agree</b> they have too much homework.',
    transcription: '[əgríː]',
    textExampleTranslate: 'Студенты согласны, что у них слишком много домашней работы',
    textMeaningTranslate: 'Согласиться - значит иметь то же мнение или убеждение, что и другой человек',
    wordTranslate: 'согласна',
  },
  {
    group: 0,
    page: 0,
    word: 'arrive',
    image: 'files/01_0003.jpg',
    audio: 'files/01_0003.mp3',
    audioMeaning: 'files/01_0003_meaning.mp3',
    audioExample: 'files/01_0003_example.mp3',
    textMeaning: 'To <i>arrive</i> is to get somewhere.',
    textExample: 'They <b>arrived</b> at school at 7 a.m.',
    transcription: '[əráiv]',
    textExampleTranslate: 'Они прибыли в школу в 7 часов утра',
    textMeaningTranslate: 'Приехать значит попасть куда-то',
    wordTranslate: 'прибыть',
  },
];

const App:FC = () => (
  <div className="App">
    <Provider store={index}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <PromoPage />
          </Route>

          <Route path="/textbook/:group/:page" exact>
            <TextBook />
          </Route>
          <Route exact path="/sprint" render={() => <Sprint words={words} />}></Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  </div>
);

export default App;
