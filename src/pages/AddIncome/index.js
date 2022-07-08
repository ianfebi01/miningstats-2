import React, { useState } from 'react';
import { API } from '../../utils/API';
import axios from 'axios';
import { Button, Gap, Input, Title } from '../../components';

const AddIncome = () => {
  const [value, setValue] = useState('');
  const [fee, setFee] = useState('');
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState('');

  const addIncome = async (e) => {
    e.preventDefault();
    setIsLoading('is-loading');
    await axios.post(`${API}/income`, {
      id: sessionStorage.getItem(`userId`),
      value: value,
      fee: fee,
      date: date,
    });
    setTimeout(() => {
      setIsLoading('');
      setDate('');
      setFee('');
      setValue('');
    }, 1000);
  };
  return (
    <div>
      <section className="hero is-small ">
        <div className="hero-body has-text-centered">
          <Title textTitle="Add Income" />
        </div>
      </section>
      <div className="columns is-centered">
        <div className="column is-6 ">
          <section className="hero is-medium round-corner has-background-white overview hero-income">
            <div className="hero-body py-4 px-5 ">
              <ul className="is-flex">
                <li>
                  <h1 className="title has-text-primary">Add Income</h1>
                </li>
              </ul>
              <section className="hero round-corner has-background-light hero-income-2 mt-4">
                <div className="hero-body px-4 py-5">
                  <form onSubmit={addIncome}>
                    <div className="columns">
                      <div className="column is-6">
                        <section className="hero round-corner has-background-white shadow">
                          <div className="hero-body px-4 py-4">
                            <Input
                              label="Total widraw"
                              placeholder="Type here"
                              type="number"
                              min="0"
                              step="any"
                              className="input my-2 round-button"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                            />
                            <h1 className="title is-size-5 has-text-primary">
                              ETH
                            </h1>
                          </div>
                        </section>
                      </div>
                      <div className="column is-6">
                        <section className="hero round-corner has-background-white shadow">
                          <div className="hero-body px-4 py-4">
                            <Input
                              label="Fee"
                              placeholder="Type here"
                              type="number"
                              min="0"
                              step="any"
                              className="input my-2 round-button"
                              value={fee}
                              onChange={(e) => setFee(e.target.value)}
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
                            {/* <button
                              type="submit"
                              className={`button my-2 btn-add is-info round-button ${isLoading} `}
                            >
                              Submit
                            </button> */}
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

export default AddIncome;
