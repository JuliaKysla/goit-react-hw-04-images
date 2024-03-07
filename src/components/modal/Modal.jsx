import React, { Component } from 'react';
import s from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    document.body.style.overflowY = 'hidden';
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    document.body.style.overflowY = 'auto';
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { tags} = this.props
    return (
      <div className={s.overlay} onClick={this.handleBackdropClick}>
        <div className={s.modal}>
          <img src={this.props.src} alt={tags} className={s.largeImage}/>
        </div>
      </div>
    );
  }
}

export default Modal;