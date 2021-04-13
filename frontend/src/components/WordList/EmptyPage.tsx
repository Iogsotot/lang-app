import { FC } from 'react';
import Book from '../../assets/images/bg_book.png';

const EmptyPage: FC = () => (
  <div className="empty__screen">
    <h2>Тут пока нет слов</h2>
    <img src={Book} alt=""/>
  </div>
);

export default EmptyPage;
