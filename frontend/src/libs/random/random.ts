import { Word } from '../../models';

export const shuffleArray = (arr: Word[]): Word[] => {
  const newArr = arr.slice(0);
  newArr.sort(() => Math.random() - 0.5);
  return newArr;
};
