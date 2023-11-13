import React from 'react';

const Button = ({ styling, text, onclick }) => (
  <button onClick={onclick} className={styling}>
    {text}
  </button>
);

export default Button;
