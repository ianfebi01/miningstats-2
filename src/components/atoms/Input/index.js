import React from "react";
import { Field, useField } from "formik";

const Input = ({ label, ...rest }) => {
  const [meta] = useField();
  return (
    <div>
      {/* <p className='is-size-6 has-text-primary mb-1'>{label}</p>
      <Field className='input' {...rest} />
      {meta.email && touched.email ? <div>{errors.email}</div> : null} */}
    </div>
  );
};

export default Input;
