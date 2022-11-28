import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Home } from "../pages";

export default function NotLoggedIn() {
  const { user } = useSelector((state) => ({ ...state }));
  return user ? <Home /> : <Outlet />;
}
