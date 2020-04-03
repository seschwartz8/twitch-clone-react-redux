import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div className='ui dimmer modals visible active'>
      <div className='ui standard modal visible active'>
        MODAL using semantic UI
      </div>
    </div>,
    // Element we want to render this portal into (in public index.html)
    document.querySelector('#modal')
  );
};

export default Modal;
