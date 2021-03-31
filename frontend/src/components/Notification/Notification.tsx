import './notification.scss';
import React, { FC, useState, useEffect } from 'react';
import { NotificationProps } from './Notification.model';

const Notification: FC<NotificationProps> = ({ clearFunction, error, notification }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [isError, setIsError] = useState(false);
  let delay: ReturnType<typeof setTimeout>;

  const openNotification = () => {
    if (notification) {
      setIsError(false);
      setText(notification);
      setIsOpen(true);
      clearFunction();
    }
  };

  const openError = () => {
    if (error) {
      setIsError(true);
      setText(error);
      setIsOpen(true);
      clearFunction();
    }
  };

  const closeAll = () => {
    setIsOpen(false);
    setText('');
  };

  useEffect(() => {
    delay = setTimeout(() => {
      if (isOpen) {
        closeAll();
      }
    }, 8000);

    openError();
    openNotification();

    return () => {
      clearTimeout(delay);
    };
  }, [error, notification]);

  return (
    <div className={`notification ${isError ? 'is-danger' : 'is-info'} ${isOpen ? 'active' : ''}`}>
      {text}
    </div>
  );
};

export default Notification;
