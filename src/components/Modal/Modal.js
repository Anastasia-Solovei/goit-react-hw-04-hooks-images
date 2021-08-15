import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleEscKey);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleEscKey);
  }

  handleEscKey = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  // useEffect(() => {

  // }, [])

  render() {
    const { handleOverlayClick } = this;

    return createPortal(
      <div className={s.Overlay} onClick={handleOverlayClick}>
        <div className={s.Modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
// };

export default Modal;
