import "./modal.css";
import React from 'react'

export default function Modal({children, isShow, handleClose, title}) {
  return (
    <>
    <div className={`modal ${isShow ? 'is-visible' : ''}`}>
        <div className="modal__overlay" onClick={()=>handleClose()}></div>
        <div className="modal__container">
            <div className="modal__header">
                <p><b>{title}</b></p>
                <button className="modal__close" onClick={handleClose}>X</button>
            </div>
            <div className="modal__content">
                {children}
            </div>
        </div>
    </div>
    </>
  )
}
