import React, { useEffect, useState } from "react";
import { ButtonLarge, Gap, InputWrapper, Link, Title } from "../../components";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Formik, Form, Field, ErrorMessage, FastField } from "formik";
import * as Yup from "yup";
import "./style.scss";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => ({ ...state }));

  const loginIfos = {
    email: "",
    password: "",
  };
  const [login, setLogin] = useState(loginIfos);
  const { email, password } = login;

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const Auth = async (values, submitProps) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/login`,
        {
          email: values.email,
          password: values.password,
        }
      );

      dispatch({ type: "LOGIN", payload: res?.data });
      Cookies.set("user", JSON.stringify(res?.data));
      setLoading(false);
      navigate("/home");
      submitProps.resetForm();
    } catch (error) {
      setLoading(false);
      setMsg(error?.response?.data?.msg);
      submitProps.resetForm();
    }
  };

  // Validations
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email"),
    password: Yup.string()
      .required("Passwrod is required")
      .min(6, "Password must be at least 6 characters long"),
  });

  return (
    <div className='main-page container is-max-desktop'>
      <section className='hero is-small '>
        <div className='hero-body'>
          <div className='container  has-text-centered'>
            <Title textTitle='Sign in' />
            {message?.register === "Register Success" ? (
              <span className='has-text-success'>{message?.register}</span>
            ) : (
              <span className='has-text-danger'>{message?.register}</span>
            )}
          </div>
        </div>
      </section>

      <Formik
        initialValues={{
          email,
          password,
        }}
        validationSchema={loginValidation}
        onSubmit={Auth}
      >
        {(formik) => (
          <Form>
            <div className='columns is is-centered mx-4'>
              <div className='column' style={{ maxWidth: "400px" }}>
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
                <button
                  className={`button my-1  is-info ${
                    loading ? "is-loading" : ""
                  }`}
                  type='submit'
                  disabled={!formik.isValid}
                >
                  Sign In
                </button>

                <Gap height={5} />

                <div className='not_have_account'>
                  <p>Not have account?</p>
                  <Gap width={5} />
                  <NavLink to='/register'> Sign up here.</NavLink>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
