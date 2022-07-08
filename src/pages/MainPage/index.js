import React from 'react';
import { useEffect } from 'react';
import {
  Card,
  CardChild,
  Detail,
  Gap,
  PrevNext,
  Statistic,
  Title,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';
import { convertMonth } from '../../utils/ConvertMonth';
import { API } from '../../utils/API';
import { refreshToken, userSelector } from '../../features/userSlice';
import { getIncomes, incomeSelectors } from '../../features/incomeSlice';
import { costsSelector, getCosts } from '../../features/costSlice';

const MainPage = ({ axiosJWT, token }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const incomes = useSelector(incomeSelectors.selectAll);
  const costs = useSelector(costsSelector.selectAll);
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getIncomes());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getCosts());
  }, [dispatch]);

  const now = new Date();
  const [selected, setSelected] = useState(now.getMonth() + 1);
  const userId = sessionStorage.getItem('userId');
  const [income, setIncome] = useState([]);
  const data = {
    labels: incomes.map((item) => {
      return convertMonth(item._id.month);
    }),
    datasets: [
      {
        label: 'Total WD',
        data: incomes.map((item) => item.value),
        backgroundColor: ['#1456C8'],
        borderRadius: 20,
        borderSkipped: false,
      },
    ],
  };

  const selectedMonth = incomes
    .filter((item) => item._id.month == selected)
    .map((item) => item._id.month)
    .toString();
  const selectedValue = parseFloat(
    parseFloat(
      +incomes
        .filter((item) => item._id.month == selected)
        .map((item) => item.value)
    ).toFixed(4)
  ).toString();
  const prevMonth = incomes
    .filter((item) => item._id.month == selected - 1)
    .map((item) => item._id.month)
    .toString();
  const prevValue = parseFloat(
    parseFloat(
      +incomes
        .filter((item) => item._id.month == selected - 1)
        .map((item) => item.value)
    ).toFixed(4)
  ).toString();
  const nextMonth = incomes
    .filter((item) => item._id.month == selected + 1)
    .map((item) => item._id.month)
    .toString();
  const nextValue = parseFloat(
    parseFloat(
      +incomes
        .filter((item) => item._id.month == selected + 1)
        .map((item) => item.value)
    ).toFixed(4)
  ).toString();

  const selectedCosts =
    parseFloat(
      parseFloat(
        +costs
          .filter((item) => item._id.month == selected)
          .map((item) => item.price)
      ).toFixed(4)
    ).toString() || 0;

  return (
    <div>
      <section className="hero is-small ">
        <div className="hero-body has-text-centered">
          <Title textTitle="Data This Month" />
        </div>
      </section>
      <div className="columns is-centered">
        <div className="column is-9">
          <div className="columns">
            <div className="column is-7">
              <Card
                title="Overview"
                month={convertMonth(selectedMonth)}
                value={selectedValue}
                dropDownContent={incomes}
                setSelected={setSelected}
                percentage={true}
                textPercentage={(
                  ((parseFloat(selectedValue) - parseFloat(prevValue)) /
                    parseFloat(prevValue)) *
                  100
                )
                  .toFixed(2)
                  .toString()}
                costsValue={Number.isNaN(selectedCosts) ? 0 : selectedCosts}
                costsMonth={convertMonth(selectedMonth)}
              />
              <Gap height={20} />
              <div className="columns">
                <div className="column is-5">
                  <CardChild
                    backgroundColor="has-background-white"
                    month={
                      prevMonth
                        ? convertMonth(prevMonth)
                        : selected > 1
                        ? convertMonth(selected - 1)
                        : 'No Data'
                    }
                    value={prevValue ? prevValue : '0'}
                  />
                </div>
                <div className="column is-2 my-auto">
                  <PrevNext />
                </div>
                <div className="column is-5">
                  <CardChild
                    backgroundColor="has-background-white"
                    month={
                      nextMonth
                        ? convertMonth(nextMonth)
                        : selected < 12
                        ? convertMonth(selected + 1)
                        : 'No Data'
                    }
                    value={nextValue ? nextValue : '0'}
                  />
                </div>
              </div>
            </div>
            <div className="column is-5">
              <Statistic data={data} />
              <Gap height={20} />
              <Detail axiosJWT={axiosJWT} token={token} selected={selected} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
