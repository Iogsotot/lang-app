import { FC } from 'react';
import useSound from 'use-sound';

import { PlayAudioButtonProps } from './PlayAudioButton.model';

const PlayAudioButton:FC <PlayAudioButtonProps> = ({ audio }) => {
  const [playAudio] = useSound(audio);

  const clickHandler = () => {
    playAudio();
  };

  return (
    <button onClick={clickHandler}><i className="fas fa-volume-up"/></button>
  );
};

export default PlayAudioButton;
