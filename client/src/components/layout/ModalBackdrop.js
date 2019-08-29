import React from 'react';
import './styles/ModalBackdrop.css';

const ModalBackdrop = ({children}) => {
  return (
    <div className='modal-backdrop'>
      {children}
    </div>
  )
}

export default ModalBackdrop;
