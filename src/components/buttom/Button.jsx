import React from 'react';
import s from './Buttom.module.css';

const Button = props => {
  return (
    <button className={s.button} onClick={props.onLoadMore}>
      Load More
    </button>
  );
};

export default Button;