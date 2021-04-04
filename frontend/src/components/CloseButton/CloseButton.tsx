import { FC } from 'react';
import { CloseButtonProps } from './CloseButton.model';

import './CloseButton.scss';

const CloseButton: FC <CloseButtonProps> = ({ flag, callback }) => {
  const handleClick = () => {
    callback(flag);
  };
  return (
    <button onClick={handleClick} className='close-btn'/>
  );
};

export default CloseButton;
