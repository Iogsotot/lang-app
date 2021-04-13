import { FC } from 'react';
import { CheckboxProps } from './Checkbox.model';

const Checkbox: FC<CheckboxProps> = ({ labelText, callback, checked }) => {
  const changeHandle = () => {
    callback();
  };

  return (
    <label className="checkbox subtitle">
      <input onChange={changeHandle} defaultChecked={checked} type="checkbox" />
      {labelText}
    </label>
  );
};

export default Checkbox;
