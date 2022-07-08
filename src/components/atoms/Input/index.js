import React from 'react';

const Input = ({ label, ...rest }) => {
  return (
    <div>
      <p className="is-size-6 has-text-primary mb-1">{label}</p>
      <input className="input" {...rest} />
    </div>
  );
};

export default Input;
