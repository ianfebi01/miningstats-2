import axios from "axios";
import React, { useState } from "react";
import { ButtonLarge, Gap, InputWrapper, Title } from "../../components";
import "./register.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { ErrorMessage, FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

const Register = () => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const register = async (values, submitProps) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:419/user/register", {
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      setLoading(false);
      dispatch({ type: "REGISTERSUCCESS", payload: res?.data?.msg });
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        setLoading(false);
      }
    }
  };

  // Validations
  const validation = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <div className='main-page container is-max-desktop'>
      <section className='hero is-small '>
        <div className='hero-body'>
          <div className='container  has-text-centered'>
            <Title textTitle='Sign Up' />
            {msg && <span className='has-text-danger'>{msg}</span>}
          </div>
        </div>
      </section>

      <Formik
        enableReinitialize
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validation}
        onSubmit={register}
      >
        {(formik) => (
          <Form>
            <div className='columns is is-centered mx-4'>
              <div className='column' style={{ maxWidth: "400px" }}>
                <span className='is-size-6 has-text-primary mb-1'>Name</span>
                <FastField
                  type='text'
                  name='name'
                  placeholder='Enter your name'
                  className='input'
                  onChange={formik?.handleChange("name")}
                />

                <span className='error-message'>
                  <ErrorMessage name='name' />
                </span>

                <Gap height={10} />
                <span className='is-size-6 has-text-primary mb-1'>Email</span>
                <FastField
                  type='text'
                  name='email'
                  placeholder='Enter your email'
                  className='input'
                  onChange={formik?.handleChange("email")}
                />
                <span className='error-message'>
                  <ErrorMessage name='email' />
                </span>
                <Gap height={10} />
                <span className='is-size-6 has-text-primary mb-1 '>
                  Password
                </span>
                <FastField
                  type='password'
                  name='password'
                  placeholder='Enter your password'
                  className='input'
                  onChange={formik?.handleChange("password")}
                />
                <span className='error-message'>
                  <ErrorMessage name='password' />
                </span>
                <Gap height={10} />
                <span className='is-size-6 has-text-primary mb-1 '>
                  Confirm Password
                </span>
                <FastField
                  type='password'
                  name='confirmPassword'
                  placeholder='Enter your password again'
                  className='input'
                  onChange={formik?.handleChange("confirmPassword")}
                />
                <span className='error-message'>
                  <ErrorMessage name='confirmPassword' />
                </span>
                <Gap height={10} />
                <button
                  className={`button my-1  is-info ${
                    loading ? "is-loading" : ""
                  }`}
                  type='submit'
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Sign Up
                </button>

                <Gap height={5} />

                <div className='not_have_account'>
                  <p>Have account?</p>
                  <Gap width={5} />
                  <NavLink to='/login'> Sign In here.</NavLink>
                </div>
              </div>

              {/* <button
                      type='submit'
                      disabled={!formik.isValid || formik.isSubmitting}
                    >
                      Submit
                    </button> */}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
