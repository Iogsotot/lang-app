import { FC } from 'react';

import Button from '../Button';

import { ModalOnCloseProps } from './ModalOnClose.model';

import { MODAL_ON_CLOSE } from '../../../../constants';

import './ModalOnClose.scss';

const { modalTitle, modalSubTitle, sumbitCloseBtnText, canselModalBtn } = MODAL_ON_CLOSE;

const ModalOnClose: FC<ModalOnCloseProps> = ({ modalIsActive, handleCancelModal, handleSubmitClose }) => (
  <div className={`modal ${modalIsActive ? 'is-active' : ''}`}>
    <div onClick={handleCancelModal} className="modal-background"></div>
    <div className="modal-content">
      <div className="box">
        <h4 className="title is-4">{modalTitle}</h4>
        <h5 className="subtitle">{modalSubTitle}</h5>
        <div className="buttons modal-buttons">
          <Button className="is-danger" text={sumbitCloseBtnText} onBtnClick={handleSubmitClose} />
          <Button className="is-primary" text={canselModalBtn} onBtnClick={handleCancelModal} />
        </div>
      </div>
    </div>
    <button onClick={handleCancelModal} className="modal-close is-large" aria-label="close"></button>
  </div>
);

export default ModalOnClose;
