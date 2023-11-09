import React from 'react';

const InputComponent = ({
  stylying,
  type,
  id,
  name,
  value,
  forH,
  changeEvent,
  text,
}) => {
  return (
    <div className={stylying}>
      <label htmlFor={forH}>{text}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={changeEvent}
        required
      />
    </div>
  );
};

export default InputComponent;
