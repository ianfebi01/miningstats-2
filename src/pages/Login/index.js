import React, { useEffect, useState } from 'react';
import { ButtonLarge, Gap, InputWrapper, Link, Title } from '../../components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    setIsLoading('is-loading');
    try {
      await axios.post('http://localhost:419/user/login', {
        email: email,
        password: password,
      });
      setTimeout(() => {
        setIsLoading('');
        navigate('/home');
        // window.location.reload();
      }, 1000);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        setIsLoading('');
      }
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('userId')) return navigate('/home');
  }, []);

  return (
    <div className="main-page container is-max-desktop">
      <section className="hero is-small ">
        <div className="hero-body has-text-centered">
          <Title textTitle="Sign in" />
        </div>
      </section>
      <div className="columns is-centered">
        <div className="column is-5">
          <form onSubmit={Auth}>
            <div className="columns is is-centered">
              <div className="column is-8">
                <InputWrapper
                  label="Email"
                  placeholder="Enter email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                <ButtonLarge
                  color="is-info"
                  label="Sign in"
                  isLoading={isLoading}
                  type="submit"
                />
                <Gap height={20} />
                <ButtonLarge color="is-white" label="Forgot password" />
              </div>
            </div>
            <div className="columns is is-centered">
              <Link
                label="Not have account?"
                link="/register"
                linkLabel="Sign up here."
              />
            </div>
          </form>
          <h1 className="has-text-centered title has-text-danger">{msg}</h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
