import { FC } from 'react';
import useSound from 'use-sound';

import { PlayAudioButtonProps } from './PlayAudioButton.model';

const PlayAudioButton: FC<PlayAudioButtonProps> = ({ audio }) => {
  const [playAudio] = useSound(audio);

  const clickHandler = () => {
    playAudio();
  };

  return (
    <button className="play-audio-btn button is-rounded" onClick={clickHandler}>
      <i className="fas fa-play" />
    </button>
  );
};

export default PlayAudioButton;
