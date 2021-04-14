import { FC } from 'react';

import { ModalOnCloseProps } from './ModalOnClose.model';

import { MODAL_ON_CLOSE } from '../../../constants/constants';

const { modalTitle, modalSubTitle, sumbitCloseBtnText, canselModalBtn } = MODAL_ON_CLOSE;

const ModalOnClose: FC<ModalOnCloseProps> = ({ modalIsActive, handleCancelModal, handleSubmitClose }) => (
  <div className={`modal ${modalIsActive ? 'is-active' : ''}`}>
    <div onClick={handleCancelModal} className="modal-background"/>
    <div className="modal-content">
      <div className="box">
        <h4 className="title is-4">{modalTitle}</h4>
        <h5 className="subtitle">{modalSubTitle}</h5>
        <div className="buttons modal-buttons">
          <button className="button is-danger" onClick={handleSubmitClose}>
            {sumbitCloseBtnText}
          </button>
          <button className="button is-primary" onClick={handleCancelModal}>
            {canselModalBtn}
          </button>
        </div>
      </div>
    </div>
    <button onClick={handleCancelModal} className="modal-close is-large" aria-label="close" />
  </div>
);

export default ModalOnClose;
