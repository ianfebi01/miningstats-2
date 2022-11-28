import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Login } from "../pages";

export default function LoggedIn() {
  const { user } = useSelector((state) => ({ ...state }));
  return user ? <Outlet /> : <Login />;
}
