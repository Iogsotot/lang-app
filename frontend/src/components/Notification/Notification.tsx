import './notification.scss';
import React, { FC, useState, useEffect } from 'react';
import { NotificationProps } from './Notification.model';
import { notifications } from '../../constants';

const {
  NOTIFICATION_TIMEOUT,
} = notifications;

const Notification: FC<NotificationProps> = ({ clearNotification, error, notification }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [isError, setIsError] = useState(false);
  let delay: ReturnType<typeof setTimeout>;

  const openNotification = () => {
    if (notification) {
      setIsError(false);
      setText(notification);
      setIsOpen(true);
      clearNotification();
    }
  };

  const openError = () => {
    if (error) {
      setIsError(true);
      setText(error);
      setIsOpen(true);
      clearNotification();
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
    }, NOTIFICATION_TIMEOUT);

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
