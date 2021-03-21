import { Word } from '../../models';

export const shuffleArray = (arr: Word[]): Word[] => {
  const newArr = arr.slice(0);
  newArr.sort(() => Math.random() - 0.5);
  return newArr;
};

export const getRandomBooleanAnswer = (chanсe = 0.5): boolean => Math.random() < chanсe;

export const randomInteger = (number: number): number => Math.floor(Math.random() * (number + 1));
