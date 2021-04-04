import { FC } from 'react';

import { ToggleButtonProps } from './ToggleButton.model';

import './ToggleButton.scss';

const ToggleButton: FC<ToggleButtonProps> = ({ property, callback, className }) => {
  const handleClick = () => {
    callback();
  };

  return (
    <div className={`toggle-button__wrapper ${className}`}>
      <input
        className="toggle-button"
        onChange={handleClick}
        checked={property}
        name="sound-toggle"
        id="sound-toggle"
        type="checkbox"
      ></input>
      <label className="toggle-button__label" htmlFor="sound-toggle">
        <i className={`fas fa-volume-${property ? 'up' : 'mute'}`} />
      </label>
    </div>
  );
};

export default ToggleButton;
