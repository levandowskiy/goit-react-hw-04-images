import { useEffect } from "react";
import './Modal.css'
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ largeImg, handlerCloseModal }) => {

  useEffect(() => {
    window.addEventListener("keydown", handlerEscape);
  
    return () => {
      window.removeEventListener("keydown", handlerEscape);
    }
  })
  
  const handlerEscape = (e) => {
    if (e.code === "Escape") {
      handlerCloseModal();
    }
  };

  const handlerBackdropClose = (e) => {
    if (e.target === e.currentTarget) {
      handlerCloseModal();
    }
  };

  return createPortal(
    <div onClick={handlerBackdropClose} className="backdrop">
      <div className="modal-wrapper">
        <img src={largeImg} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
};