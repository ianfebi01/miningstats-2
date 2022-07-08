import React, { Fragment, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardChild,
  Detail,
  Gap,
  Navbar,
  PrevNext,
  Statistic,
  Title,
} from '../../components';
import { API } from '../../utils/API';
import MainPage from '../MainPage';
import AddIncome from '../AddIncome';
import AddCost from '../AddCost';
import IncomeList from '../IncomeList';
import { convertMonth } from '../../utils/ConvertMonth';
import CostList from '../CostList';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const [expire, setExpire] = useState('');
  const [userId, setUserId] = useState('');
  const [data, setData] = useState({
    labels: 'No Data',
    datasets: [
      {
        label: 'Total WD',
        data: '0',
        backgroundColor: ['#1456C8'],
        borderRadius: 20,
        borderSkipped: false,
      },
    ],
  });

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get(`${API}/user/token`);
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      sessionStorage.setItem('userId', decoded.userId);
      setUserId(decoded.userId);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate('/');
      }
    }
  };

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get('http://localhost:419/user/token');
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const [isLoading, setIsLoading] = useState('');

  const logOut = async () => {
    try {
      setIsLoading('is-loading');
      await axios.delete(`${API}/user/logout`);
      setTimeout(() => {
        setIsLoading('');
        sessionStorage.clear();
        navigate('/');
        // window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar onClick={logOut} isLoading={isLoading} />
      <div className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={<MainPage axiosJWT={axiosJWT} token={token} />}
          />
          <Route path="addincome" element={<AddIncome />} />
          <Route
            path="addcost"
            element={<AddCost axiosJWT={axiosJWT} token={token} />}
          />
          <Route
            path="incomelist"
            element={<IncomeList axiosJWT={axiosJWT} token={token} />}
          />
          <Route
            path="costlist"
            element={<CostList axiosJWT={axiosJWT} token={token} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
