import React from 'react';
import { Input } from '../../atoms';
import './inputWrapper.scss';

const InputWrapper = ({ label, placeholder, ...rest }) => {
  return (
    <section className="hero has-background-white input-wrapper">
      <div className="hero-body  py-4 px-4 ">
        <Input label={label} placeholder={placeholder} {...rest} />
      </div>
    </section>
  );
};

export default InputWrapper;
