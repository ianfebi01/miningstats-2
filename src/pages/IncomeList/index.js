import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Gap, Title } from '../../components';
import { API } from '../../utils/API';
import { convertDate } from '../../utils/ConvertDate';
import './incomeList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const IncomeList = ({ axiosJWT, token }) => {
  const [allIncome, setAllIncome] = useState([]);
  const userId = sessionStorage.getItem('userId');
  const [isLoading, setIsLoading] = useState('');

  const getAllIncome = async () => {
    const response = await axiosJWT.get(`${API}/income/id/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setAllIncome(response.data);
  };
  useEffect(() => {
    getAllIncome();
  }, []);

  const deleteIncome = async (_id) => {
    try {
      setIsLoading('is-loading');
      await axios.delete(`${API}/income/${_id}`);
      setTimeout(() => {
        setIsLoading('');
        getAllIncome();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const [editIncomeId, setEditIncomeId] = useState('');
  const [id, setId] = useState('');
  const [value, setValue] = useState('');
  const [fee, setFee] = useState('');
  const [date, setDate] = useState('');

  const handleEditIncomeClick = (event, item) => {
    event.preventDefault();
    setEditIncomeId(item._id);
    setId(item._id);
    setValue(item.value);
    setFee(item.fee);
    setDate(item.date);
  };
  const cancelEdit = () => {
    setEditIncomeId('');
  };
  const saveIncome = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${API}/income/${id}`, {
        date: date,
        value: value,
        fee: fee,
      });
      cancelEdit();
      getAllIncome();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section className="hero is-small ">
        <div className="hero-body has-text-centered">
          <Title textTitle="Income List" />
        </div>
      </section>
      <div className="columns is-centered">
        <div className="column is-9">
          <section className="hero is-medium round-corner has-background-white income-list">
            <div className="hero-body px-5 py-4">
              <ul className="is-flex">
                <li>
                  <h1 className="title has-text-primary mb-0">Income</h1>
                </li>
                <li className="mr-1 ml-auto">
                  <Link to="/home/addincome">
                    <Button color="is-info" label="Add Income" />
                  </Link>
                </li>
              </ul>
              <Gap height={10} />
              <form onSubmit={saveIncome}>
                <table className="table is-fullwidth is-hoverable ">
                  <thead>
                    <tr>
                      <td>No.</td>
                      <td>Date</td>
                      <td>Value</td>
                      <td>Fee</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {allIncome.map((item, index) => {
                      return (
                        <Fragment>
                          {editIncomeId === item._id ? (
                            <tr>
                              <td>{index + 1}</td>
                              <td>
                                <input
                                  className="input is-small"
                                  type="date"
                                  name="date"
                                  value={date}
                                  onChange={(e) => setDate(e.target.value)}
                                />
                              </td>
                              <td>
                                <input
                                  className="input is-small"
                                  type="number"
                                  min="0"
                                  step="any"
                                  placeholder="Enter income value"
                                  name="value"
                                  value={value}
                                  onChange={(e) => setValue(e.target.value)}
                                />
                              </td>
                              <td>
                                <input
                                  className="input is-small"
                                  type="number"
                                  min="0"
                                  step="any"
                                  placeholder="Enter income fee"
                                  name="fee"
                                  value={fee}
                                  onChange={(e) => setFee(e.target.value)}
                                />
                              </td>
                              <td>
                                <Button label="cancel" onClick={cancelEdit} />
                                <Button type="submit" label="save" />
                              </td>
                            </tr>
                          ) : (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{convertDate(item.date)}</td>
                              <td>{item.value}</td>
                              <td>{item.fee}</td>
                              <td className="is-centered">
                                <Button
                                  label={
                                    <FontAwesomeIcon
                                      className="is-clickable"
                                      icon={faPenToSquare}
                                      onClick={(event) =>
                                        handleEditIncomeClick(event, item)
                                      }
                                    />
                                  }
                                />
                                <Button
                                  isLoading={isLoading}
                                  label={
                                    <FontAwesomeIcon
                                      className="is-clickable"
                                      onClick={() => deleteIncome(item._id)}
                                      icon={faTrashCan}
                                    />
                                  }
                                />
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default IncomeList;
