import React, { FC, useState, useEffect } from 'react';
import { InputProps } from './Input.model';

const Input: FC<InputProps> = ({
  icon,
  type = 'text',
  value,
  successText = '',
  errorText = '',
  onChangeHandler,
  placeholder,
}) => {
  const [elementData, setElementData] = useState({
    element: <></>,
    class: '',
  });

  const checkElementData = () => {
    if (successText) {
      setElementData({
        element:
          <span className="icon is-small is-right">
            <i className="fas fa-check">&#0;</i>
          </span>,
        class: 'is-success',
      });
    } else if (errorText) {
      setElementData({
        element:
          <span className="icon is-small is-right">
            <i className="fas fa-exclamation-triangle">&#0;</i>
          </span>,
        class: 'is-danger',
      });
    } else {
      setElementData({
        element: <></>,
        class: '',
      });
    }
  };

  useEffect(() => {
    checkElementData();
  }, [successText, errorText]);

  return (
    <div className="field">
      <label className="label">{placeholder}</label>
      <div className="control has-icons-left has-icons-right">
        <input
          className={`input ${elementData.class}`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChangeHandler}
        />
        <span className="icon is-small is-left">
          <i className={`fas ${icon}`}>&#0;</i>
        </span>
        {elementData.element}
      </div>
      <p className={`help ${elementData.class}`}>{successText || errorText}</p>
    </div>
  );
};

export default Input;
