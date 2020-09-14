import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import defIMG from '../default.jpg';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static defaultProps = {
    large: defIMG,
  };
  modalClose = event => {
    if (event.target === event.currentTarget) {
      this.props.openModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.keydownPress);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownPress);
  }

  keydownPress = e => {
    if (e.code === 'Escape') {
      this.props.openModal();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.modalClose}>
        <div className="Modal">
          <img src={this.props.large} alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
