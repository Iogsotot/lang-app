import { Word } from '../../../models/word';

export interface StartCountTimerTypes {
  startCountTimer: number | null;
}

export interface SavannahProps {
  page: number,
  group: number,
  words?: Word[],
  test?: string,
}
