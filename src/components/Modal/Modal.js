import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ children, onClose }) {
  useEffect(() => {
    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  });

  const handleEscKey = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleOverlayClick}>
      <div className={s.Modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
