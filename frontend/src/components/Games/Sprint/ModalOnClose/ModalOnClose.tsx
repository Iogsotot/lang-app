import { FC } from 'react';

import Button from '../Button';

import { ModalOnCloseProps } from './ModalOnClose.model';

const ModalOnClose:FC<ModalOnCloseProps> = ({ modalIsActive, handleCancelModal, handleSubmitClose }) => (
  <div className={`modal ${modalIsActive ? 'is-active' : ''}`}>
    <div onClick={handleCancelModal} className="modal-background"></div>
    <div className="modal-content">
      <div className="box">
        <h4 className="title is-4">You haven't finished this training!</h4>
        <h5 className="subtitle">If you close the training, you'll lose your results</h5>
        <div className="buttons modal-buttons">
          <Button className="is-danger" text="Close training" onBtnClick={handleSubmitClose}/>
          <Button className="is-primary" text="Cancel" onBtnClick={handleCancelModal}/>
        </div>
      </div>
    </div>
    <button onClick={handleCancelModal} className="modal-close is-large" aria-label="close"></button>
  </div>
);

export default ModalOnClose;
