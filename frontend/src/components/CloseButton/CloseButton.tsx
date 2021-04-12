import { FC } from 'react';
import { CloseButtonProps } from './CloseButton.model';

import './CloseButton.scss';

const CloseButton: FC <CloseButtonProps> = ({ callback }) => {
  const handleClick = () => {
    callback();
  };
  return (
    <button onClick={handleClick} className='close-btn'/>
  );
};

export default CloseButton;
