import { useField } from "formik";
import React from "react";
// import { Input } from "../../atoms";
import "./inputWrapper.scss";

export default function InputWrapper({ label, placeholder, ...props }) {
  const [meta, field] = useField(props);

  return (
    <section className='hero has-background-white input-wrapper'>
      <div className='hero-body  py-4 px-4 '>
        <p className='is-size-6 has-text-primary mb-1'>{label}</p>
        <input
          type={field.type}
          name={field.name}
          placeholder={placeholder}
          {...props}
          {...field}
          className='input'
        />
        {meta.error && meta.touched ? <div>{meta.error}gg</div> : null}
      </div>
    </section>
  );
}
