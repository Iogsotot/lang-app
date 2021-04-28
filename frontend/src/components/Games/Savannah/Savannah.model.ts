import { Word, WordListState } from '../../../models/word';
import { GameDataState } from '../../../models';

export interface StartCountTimerTypes {
  startCountTimer: number | null;
}

export interface SavannahProps {
  page: number,
  group: number,
  words?: Word[],
  test?: string,
  location?: string,
  wordsFromStore?: Word[],
}

export interface IMapStateToProps {
  gameData: GameDataState;
  wordList: WordListState;
}
