import axios from 'axios';
import React, { useState } from 'react';
import { Button, Gap, Input, Title } from '../../components';
import { API } from '../../utils/API';

const AddCost = ({ axiosJWT, token }) => {
  const [isLoading, setIsLoading] = useState('');
  const [detail, setDetail] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');

  const addCost = async () => {
    setIsLoading('is-loading');
    const userId = sessionStorage.getItem('userId');
    await axios.post(`${API}/cost`, {
      id: userId,
      detail: detail,
      price: price,
      date: date,
    });
    setTimeout(() => {
      setIsLoading('');
      setDate('');
      setDetail('');
      setPrice('');
    }, 1000);
  };
  return (
    <div>
      <section className="hero is-small ">
        <div className="hero-body has-text-centered">
          <Title textTitle="Add Cost" />
        </div>
      </section>
      <div className="columns is-centered">
        <div className="column is-6 ">
          <section className="hero is-medium round-corner has-background-white overview hero-income">
            <div className="hero-body py-4 px-5 ">
              <ul className="is-flex">
                <li>
                  <h1 className="title has-text-primary">Add Cost</h1>
                </li>
              </ul>
              <section className="hero round-corner has-background-light hero-income-2 mt-4">
                <div className="hero-body px-4 py-5">
                  <form onSubmit={addCost}>
                    <div className="columns">
                      <div className="column is-6">
                        <section className="hero round-corner has-background-white shadow">
                          <div className="hero-body px-4 py-4">
                            <Input
                              label="Detail"
                              placeholder="Type here"
                              type="text"
                              className="input my-2 round-button"
                              value={detail}
                              onChange={(e) => setDetail(e.target.value)}
                            />
                            <Gap height={18.5} />
                          </div>
                        </section>
                      </div>
                      <div className="column is-6">
                        <section className="hero round-corner has-background-white shadow">
                          <div className="hero-body px-4 py-4">
                            <Input
                              label="Price"
                              placeholder="Type here"
                              type="number"
                              min="0"
                              step="any"
                              className="input my-2 round-button"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                            />
                            <h1 className="title is-size-5 has-text-primary">
                              ETH
                            </h1>
                          </div>
                        </section>
                      </div>
                    </div>
                    <section className="hero round-corner has-background-white shadow">
                      <div className="hero-body px-4 py-4">
                        <div className="columns">
                          <div className="column is-9">
                            <Input
                              label="Date"
                              placeholder="Type here"
                              type="date"
                              className="input my-2"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                            />
                          </div>
                          <div className="column is-3">
                            <Gap height={35} />
                            <Button
                              color="is-info"
                              isLoading={isLoading}
                              type="submit"
                              label="Submit"
                            />
                          </div>
                        </div>
                      </div>
                    </section>
                  </form>
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AddCost;
