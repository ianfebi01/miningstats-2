import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRef } from "react";
import useOutsideClick from "./useOutsideClick";
import { Button } from "../../atoms";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Burger
  const [active, setActive] = useState("");
  const changeActive = () => {
    if (active === "is-active") {
      setActive("");
    } else {
      setActive("is-active");
    }
  };
  const ref = useRef();

  useOutsideClick(ref, () => {
    setActive("");
  });
  const [navActiveAddIncome, setNavActiveAddIncome] = useState(
    "has-text-grey-primary"
  );
  const [navActiveAddCost, setNavActiveAddCost] = useState(
    "has-text-grey-primary"
  );
  const [navActiveIncomeList, setNavActiveIncomeList] = useState(
    "has-text-grey-primary"
  );
  const [navActiveCostList, setNavActiveCostList] = useState(
    "has-text-grey-primary"
  );

  const handleClickMiningStats = () => {
    setNavActiveAddCost("has-text-grey-primary");
    setNavActiveIncomeList("has-text-grey-primary");
    setNavActiveCostList("has-text-grey-primary");
    setNavActiveAddIncome("has-text-grey-primary");
  };
  const handleClickAddIncome = () => {
    setNavActiveAddCost("has-text-grey-primary");
    setNavActiveIncomeList("has-text-grey-primary");
    setNavActiveCostList("has-text-grey-primary");
    setNavActiveAddIncome("has-text-primary");
  };
  const handleClickAddCost = () => {
    setNavActiveAddIncome("has-text-grey-primary");
    setNavActiveIncomeList("has-text-grey-primary");
    setNavActiveCostList("has-text-grey-primary");
    setNavActiveAddCost("has-text-primary");
  };

  const handleClickIncomeList = () => {
    setNavActiveAddIncome("has-text-grey-primary");
    setNavActiveAddCost("has-text-grey-primary");
    setNavActiveCostList("has-text-grey-primary");
    setNavActiveIncomeList("has-text-primary");
  };
  const handleClickCostList = () => {
    setNavActiveAddIncome("has-text-grey-primary");
    setNavActiveAddCost("has-text-grey-primary");
    setNavActiveIncomeList("has-text-grey-primary");
    setNavActiveCostList("has-text-primary");
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/user/logout`
      );

      dispatch({ type: "LOGOUT" });
      Cookies.set("user", null);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setMsg(error?.response?.data?.msg);
    }
  };

  return (
    <div>
      <nav className='navbar is-transparent nav-height'>
        <div className='container is-max-widescreen'>
          <div className='navbar-brand'>
            <Link
              to='/'
              className='navbar-item brand-text'
              onClick={handleClickMiningStats}
            >
              <strong className='is-size-4 navMenuFont has-text-primary'>
                MiningStats
              </strong>
            </Link>
            <div
              ref={ref}
              onClick={changeActive}
              className={`burger navbar-burger ${active}`}
              data-target='navMenu'
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className={`navbar-menu ${active}`} id='navMenu'>
            <div className='navbar-start'>
              <Link
                to='/addincome'
                onClick={handleClickAddIncome}
                className={`navbar-item ${navActiveAddIncome}`}
              >
                Add Income
              </Link>
              <Link
                to='/addcost'
                onClick={handleClickAddCost}
                className={`navbar-item ${navActiveAddCost}`}
              >
                Add Cost
              </Link>
              <Link
                to='/incomelist'
                onClick={handleClickIncomeList}
                className={`navbar-item ${navActiveIncomeList}`}
              >
                Income List
              </Link>
              <Link
                to='/costlist'
                onClick={handleClickCostList}
                className={`navbar-item ${navActiveCostList}`}
              >
                Cost List
              </Link>
            </div>
            <div className='navbar-end'>
              <div className='navbar-item'>
                <div className='buttons'>
                  <button
                    className={`button  ${loading && "is-loading"}`}
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
