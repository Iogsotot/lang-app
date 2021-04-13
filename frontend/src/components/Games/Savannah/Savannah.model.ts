import { Word } from '../../../models/word';

export interface StartCountTimerTypes {
  startCountTimer: number | null;
}

export interface SavannahProps {
  page: number,
  group: number,
  words?: Word[],
  test?: string,
  location?: string,
}

// export interface GameProps {
//   statsData: any,
//   currentWordClassNames: string,
//   WORDS: any,
//   currentWords: any,
//   wordsChunk: any,
//   soughtIndex: any,
//   checkPair: any,
// }
