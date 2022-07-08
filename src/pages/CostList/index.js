import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Gap, Title } from '../../components';
import { API } from '../../utils/API';
import { convertDate } from '../../utils/ConvertDate';
import './costList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const CostList = ({ axiosJWT, token }) => {
  const [allCost, setAllCost] = useState([]);
  const userId = sessionStorage.getItem('userId');
  const [isLoading, setIsLoading] = useState('');

  const getAllCost = async () => {
    const response = await axiosJWT.get(`${API}/cost/id/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setAllCost(response.data);
  };
  useEffect(() => {
    getAllCost();
  }, []);

  const deleteCost = async (_id) => {
    try {
      setIsLoading('is-loading');
      await axiosJWT.delete(`${API}/cost/${_id}`);
      setTimeout(() => {
        setIsLoading('');
        getAllCost();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const [editCostId, setEditCostId] = useState('');
  const [id, setId] = useState('');
  const [detail, setDetail] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');

  const handleEditCostClick = (event, item) => {
    event.preventDefault();
    setEditCostId(item._id);
    setId(item._id);
    setDetail(item.detail);
    setPrice(item.price);
    setDate(item.date);
  };
  const cancelEdit = () => {
    setEditCostId('');
  };
  const saveCost = async (e) => {
    e.preventDefault();
    try {
      await axiosJWT.patch(`${API}/cost/${id}`, {
        date: date,
        detail: detail,
        price: price,
      });
      cancelEdit();
      getAllCost();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section className="hero is-small ">
        <div className="hero-body has-text-centered">
          <Title textTitle="Cost List" />
        </div>
      </section>
      <div className="columns is-centered">
        <div className="column is-9">
          <section className="hero is-medium round-corner has-background-white income-list">
            <div className="hero-body px-5 py-4">
              <ul className="is-flex">
                <li>
                  <h1 className="title has-text-primary mb-0">Cost</h1>
                </li>
                <li className="mr-1 ml-auto">
                  <Link to="/home/addcost">
                    <Button color="is-info" label="Add Cost" />
                  </Link>
                </li>
              </ul>
              <Gap height={10} />
              <form onSubmit={saveCost}>
                <table className="table is-fullwidth is-hoverable ">
                  <thead>
                    <tr>
                      <td>No.</td>
                      <td>Date</td>
                      <td>Detail</td>
                      <td>Price</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {allCost.map((item, index) => {
                      return (
                        <Fragment>
                          {editCostId === item._id ? (
                            <tr key={item._id}>
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
                                  type="text"
                                  placeholder="Enter income value"
                                  name="detail"
                                  value={detail}
                                  onChange={(e) => setDetail(e.target.value)}
                                />
                              </td>
                              <td>
                                <input
                                  className="input is-small"
                                  type="number"
                                  min="0"
                                  step="any"
                                  placeholder="Enter income fee"
                                  name="price"
                                  value={price}
                                  onChange={(e) => setPrice(e.target.value)}
                                />
                              </td>
                              <td>
                                <Button label="cancel" onClick={cancelEdit} />
                                <Button type="submit" label="save" />
                              </td>
                            </tr>
                          ) : (
                            <tr key={item._id}>
                              <td>{index + 1}</td>
                              <td>{convertDate(item.date)}</td>
                              <td>{item.detail}</td>
                              <td>{item.price}</td>
                              <td className="is-centered">
                                <Button
                                  label={
                                    <FontAwesomeIcon
                                      className="is-clickable"
                                      icon={faPenToSquare}
                                      onClick={(event) =>
                                        handleEditCostClick(event, item)
                                      }
                                    />
                                  }
                                />
                                <Button
                                  isLoading={isLoading}
                                  label={
                                    <FontAwesomeIcon
                                      className="is-clickable"
                                      onClick={() => deleteCost(item._id)}
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

export default CostList;
