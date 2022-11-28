import React from "react";
import { useEffect } from "react";
import {
  Card,
  CardChild,
  Detail,
  Dropdown,
  Gap,
  PrevNext,
  Statistic,
  Title,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { convertMonth } from "../../utils/ConvertMonth";
import { API } from "../../utils/API";
import { refreshToken, userSelector } from "../../features/userSlice";
import { getIncomes, incomeSelectors } from "../../features/incomeSlice";
import { costsSelector, getCosts } from "../../features/costSlice";
import axios from "axios";

const MainPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const data = {
    labels: ["Sunday", "Monday"],
    datasets: [
      {
        label: "Total WD",
        data: [33, 44],
        backgroundColor: ["#1456C8"],
        borderRadius: 20,
        borderSkipped: false,
      },
    ],
  };

  const now = new Date();

  return (
    <div>
      <section className='hero is-small '>
        <div className='hero-body has-text-centered'>
          <Title textTitle='Data This Month' />
        </div>
      </section>
      <div className='columns is-centered'>
        <div className='column is-9'>
          <div className='columns'>
            <div className='column is-7'>
              <section className='hero is-medium round-corner has-background-white overview py-2'>
                <div className='hero-body py-4 px-5'>
                  <ul className='is-flex'>
                    <li>
                      <h1 className='title has-text-primary'>Overview</h1>
                    </li>
                    <li className='mr-1 ml-auto'>
                      {/* Dropdown */}
                      <Dropdown month={[]} setSelected='' />
                    </li>
                  </ul>
                  <section className='hero round-corner has-background-light'>
                    <div className='hero-body py-4 px-5'>
                      <div className='columns'>
                        <div className='column is-6'>
                          <CardChild
                            backgroundColor='has-background-white'
                            shadow='shadow'
                            month={2}
                            value={2}
                            percentage={23}
                            textPercentage='Up to'
                          />
                        </div>
                        <div className='column is-6'>
                          <CardChild month={[]} value={2} />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </section>
              <Gap height={20} />
              <div className='columns'>
                <div className='column is-5'>
                  <CardChild
                    backgroundColor='has-background-white'
                    month={2}
                    value={0}
                  />
                </div>
                <div className='column is-2 my-auto'>
                  <PrevNext />
                </div>
                <div className='column is-5'>
                  <CardChild
                    backgroundColor='has-background-white'
                    month={2}
                    value={0}
                  />
                </div>
              </div>
            </div>
            <div className='column is-5'>
              <Statistic data={data} />
              <Gap height={20} />
              {/* <Detail axiosJWT={axiosJWT} token={token} selected={selected} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
