import React, { useEffect, useState, Fragment } from "react";

import axios from "axios";
import {
  CardChild,
  Detail,
  Dropdown,
  Gap,
  Navbar,
  PrevNext,
  ReadOnlyRow,
  Statistic,
  Title,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import BounceLoader from "react-spinners/BounceLoader";
import moment from "moment";

const Home = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { data } = useSelector((state) => ({ ...state }));

  const dataStatistic = {
    labels: data?.overview?.allMonth,
    datasets: [
      {
        label: "Total WD",
        data: data?.overview?.allIncomeTotal,
        backgroundColor: ["#1456C8"],
        borderRadius: 20,
        borderSkipped: false,
      },
    ],
  };

  useEffect(() => {
    getData();
    getAllCost();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/overview`,
        {
          headers: {
            Authorization: "Bearer " + users?.access_token,
          },
        }
      );

      setLoading(false);
      dispatch({ type: "OVERVIEW", payload: res?.data?.overview });
    } catch (error) {
      setErrorMessage(error?.response?.data?.msg);
    }
  };

  const getAllCost = async () => {
    setLoading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/cost`
    );
    dispatch({ type: "ALLCOST", payload: response?.data });

    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div className='container is-max-widescreen' style={{ height: "80vh" }}>
        {loading ? (
          <div className='loader-gg'>
            <BounceLoader
              color='#1456c8'
              loading={loading}
              size={70}
              aria-label='Loading Spinner'
              data-testid='loader'
            />
          </div>
        ) : (
          <Fragment>
            <section className='hero is-small '>
              <div className='hero-body has-text-centered'>
                <Title textTitle='Data This Month' />
              </div>
            </section>
            <div className='columns is-centered'>
              <div className='column is-12'>
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
                            <Dropdown
                              month={data?.overview?.allMonth || []}
                              setSelected={setSelected}
                            />
                          </li>
                        </ul>
                        <section className='hero round-corner has-background-light'>
                          <div className='hero-body py-4 px-5'>
                            <div className='columns'>
                              <div className='column is-6'>
                                <CardChild
                                  backgroundColor='has-background-white'
                                  shadow='shadow'
                                  month={data?.overview?.month}
                                  value={data?.overview?.profit}
                                  percentage={23}
                                  textPercentage='Up to'
                                />
                              </div>
                              <div className='column is-6'>
                                <CardChild
                                  month={data?.overview?.month}
                                  value={data?.overview?.cost}
                                />
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
                          month={
                            data?.overview?.incomePrev
                              ? moment(
                                  String(data?.overview?.incomePrev?._id?.month)
                                ).format("MMMM")
                              : "No Data"
                          }
                          value={
                            data?.overview?.incomePrev
                              ? data?.overview?.incomePrev?.total
                              : "0"
                          }
                        />
                      </div>
                      <div className='column is-2 my-auto'>
                        <PrevNext />
                      </div>
                      <div className='column is-5'>
                        <CardChild
                          backgroundColor='has-background-white'
                          month={moment(
                            String(data?.overview?.incomeNext?._id?.month)
                          ).format("MMMM")}
                          value={data?.overview?.incomeNext?.total}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='column is-5'>
                    <Statistic data={dataStatistic} />
                    <Gap height={20} />
                    <section className='hero detail-cost round-corner has-background-white'>
                      <div className='hero-body py-4 px-5'>
                        <div className='title-underline is-flex'>
                          <h1 className='has-text-primary '>Detail Cost</h1>
                        </div>
                        <div className='box-table'>
                          <form action='#'>
                            <table className='table has-text-primary is-size-7 is-fullwidth is-hoverable'>
                              <tbody>
                                {data?.allCost.map((item, index) => {
                                  return (
                                    <tr key={item._id}>
                                      <th className='is-borderless'>
                                        {index + 1}
                                      </th>
                                      <td className='is-borderless'>
                                        {item.detail}
                                      </td>
                                      <td className='is-borderless'>
                                        {item.price}
                                      </td>
                                      <td className='is-borderless'>ETH</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </form>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Home;
