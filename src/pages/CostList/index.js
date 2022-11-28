import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Gap, Navbar, Title } from "../../components";
import { convertDate } from "../../utils/ConvertDate";
import "./costList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import { useDispatch, useSelector } from "react-redux";

const CostList = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => ({ ...state }));

  const [loading, setLoading] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(null);

  const getAllIncome = async () => {
    setLoading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/cost`
    );
    dispatch({ type: "ALLCOST", payload: response?.data });

    setLoading(false);
  };
  useEffect(() => {
    getAllIncome();
  }, []);

  const deleteIncome = async (_id) => {
    setLoadingBtn(_id);
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/cost/${_id}`);

      const newAllCost = data.allCost.filter((item) => item._id !== _id);

      dispatch({ type: "ALLCOST", payload: newAllCost });
      setLoadingBtn(null);
    } catch (error) {
      setLoadingBtn(null);
    }
  };

  const [editIncomeId, setEditIncomeId] = useState("");
  const [id, setId] = useState("");
  const [value, setValue] = useState("");
  const [fee, setFee] = useState("");
  const [date, setDate] = useState("");

  const handleEditIncomeClick = (event, item) => {
    event.preventDefault();
    setEditIncomeId(item._id);
    setId(item._id);
    setValue(item.detail);
    setFee(item.price);
    setDate(item.date);
  };
  const cancelEdit = () => {
    setEditIncomeId("");
  };
  const saveIncome = async () => {
    setLoadingBtn(id);
    try {
      await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/cost/${id}`, {
        detail: value,
        price: fee,
        date: date,
      });
      const index = data?.allCost.findIndex((item) => item?._id === id);
      const newAllCost = data?.allCost;
      if (index !== -1) {
        newAllCost[index] = {
          detail: value,
          price: fee,
          date: date,
        };

        dispatch({ type: "ALLCOST", payload: newAllCost });
      }
      setLoadingBtn(null);
      cancelEdit();
    } catch (error) {
      setLoadingBtn(null);
    }
  };

  return (
    <div>
      <Navbar />
      <section className='hero is-small '>
        <div className='hero-body has-text-centered'>
          <Title textTitle='Cost List' />
        </div>
      </section>
      <div className='columns is-centered'>
        <div className='column is-9'>
          <section className='hero is-medium round-corner has-background-white income-list is-centered'>
            <div className='hero-body px-5 py-4'>
              <ul className='is-flex'>
                <li>
                  <h1 className='title has-text-primary mb-0'>Cost</h1>
                </li>
                <li className='mr-1 ml-auto'>
                  <Link to='/addincome'>
                    <Button color='is-info' label='Add Income' />
                  </Link>
                </li>
              </ul>
              <Gap height={10} />
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
                  <table className='table is-fullwidth is-hoverable '>
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
                      {data?.allCost.map((item, index) => {
                        return (
                          <Fragment key={index}>
                            {editIncomeId === item._id ? (
                              // Edit
                              <tr key={item?.id}>
                                <td>{index + 1}</td>
                                <td>
                                  <input
                                    className='input is-small'
                                    type='date'
                                    name='date'
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                  />
                                </td>
                                <td>
                                  <input
                                    className='input is-small'
                                    type='text'
                                    placeholder='Enter income value'
                                    name='value'
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                  />
                                </td>
                                <td>
                                  <input
                                    className='input is-small'
                                    type='number'
                                    min='0'
                                    step='any'
                                    placeholder='Enter income fee'
                                    name='fee'
                                    value={fee}
                                    onChange={(e) => setFee(e.target.value)}
                                  />
                                </td>
                                <td
                                  className='is-centered is-flex'
                                  style={{ gap: "12px" }}
                                >
                                  <Button label='cancel' onClick={cancelEdit} />
                                  <Button
                                    type='submit'
                                    isLoading={
                                      loadingBtn === item?._id ? true : false
                                    }
                                    onClick={saveIncome}
                                    label='save'
                                  />
                                </td>
                              </tr>
                            ) : (
                              // Edit End
                              <tr key={item?.id}>
                                <td>{index + 1}</td>
                                <td>{convertDate(item.date)}</td>
                                <td>{item.detail}</td>
                                <td>{item.price}</td>
                                <td
                                  className='is-centered is-flex'
                                  style={{ gap: "12px" }}
                                >
                                  <Button
                                    label={
                                      <FontAwesomeIcon
                                        className='is-clickable'
                                        icon={faPenToSquare}
                                      />
                                    }
                                    onClick={(event) =>
                                      handleEditIncomeClick(event, item)
                                    }
                                  />
                                  <Button
                                    label={
                                      <FontAwesomeIcon icon={faTrashCan} />
                                    }
                                    onClick={() => deleteIncome(item._id)}
                                    isLoading={
                                      loadingBtn === item?._id ? true : false
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
                </Fragment>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CostList;
