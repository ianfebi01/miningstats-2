import axios from 'axios';
import React, { useState } from 'react';
import { ButtonLarge, Gap, InputWrapper, Title } from '../../components';
import './register.scss';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState('');

  const Register = async (e) => {
    e.preventDefault();
    setIsLoading('is-loading');
    try {
      await axios.post('http://localhost:419/user/register', {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      setTimeout(() => {
        setIsLoading('');
        navigate('/');
      }, 1000);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="main-page container is-max-desktop">
      <section className="hero is-small ">
        <div className="hero-body has-text-centered">
          <Title textTitle="Register" />
        </div>
      </section>

      <div className="columns is-centered">
        <div className="column is-9">
          <form onSubmit={Register}>
            <div className="columns is is-centered">
              <div className="column is-4">
                <InputWrapper
                  label="Name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Gap height={20} />
                <InputWrapper
                  label="Password"
                  placeholder="Enter password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="column is-4">
                <InputWrapper
                  label="Email"
                  type="text"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Gap height={20} />
                <InputWrapper
                  label="Confirm Password"
                  placeholder="Re-Enter password"
                  type="password"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                />
              </div>
              <div className="column is-3">
                <ButtonLarge
                  color="is-info"
                  loading={isLoading}
                  label="Register"
                  type="submit"
                />
                <Gap height={20} />
                <NavLink to="/">
                  <ButtonLarge color="is-white" label="Sign in" />
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
      <p className=" has-text-centered has-text-danger">{msg}</p>
    </div>
  );
};

export default Register;
