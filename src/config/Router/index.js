import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home, Login, Register } from '../../pages';
const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home/*" element={<Home />} />
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterApp;
