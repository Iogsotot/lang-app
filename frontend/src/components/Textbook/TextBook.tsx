import React, { FC } from 'react';
import WordList from '../WordList';
import './textbook.scss';

const TextBook: FC = () => (
  <section className="textbook">
    <WordList />
  </section>
);

export default TextBook;
