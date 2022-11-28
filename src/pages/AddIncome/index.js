import React, { useState } from "react";

import axios from "axios";
import { Button, Gap, Input, Navbar, Title } from "../../components";
import { ErrorMessage, FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

const AddIncome = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [isLoading, setIsLoading] = useState("");

  const addIncome = async (values, submitProps) => {
    try {
      setIsLoading("is-loading");
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/income`, {
        id: user?.id,
        value: values?.wd,
        fee: values?.fee,
        date: values?.date,
      });
      submitProps.resetForm();
      setIsLoading("");
    } catch (error) {}
  };

  const validation = Yup.object({
    wd: Yup.string()
      .required("Total wd is required")
      .matches(/^\d*\.?\d*$/, "Only accept valid number"),
    fee: Yup.string()
      .required("Fee is required")
      .matches(/^\d*\.?\d*$/, "Only accept valid number"),
    date: Yup.string().required("Date is required"),
  });
  return (
    <div>
      <Navbar />
      <section className='hero is-small '>
        <div className='hero-body has-text-centered'>
          <Title textTitle='Add Income' />
        </div>
      </section>
      <div className='columns is-centered'>
        <div className='column is-6 '>
          <section className='hero is-medium round-corner has-background-white overview hero-income'>
            <div className='hero-body py-4 px-5 '>
              <ul className='is-flex'>
                <li>
                  <h1 className='title has-text-primary'>Add Income</h1>
                </li>
              </ul>
              <section className='hero round-corner has-background-light hero-income-2 mt-4'>
                <div className='hero-body px-4 py-5'>
                  <Formik
                    enableReinitialize
                    initialValues={{
                      wd: 0,
                      fee: 0,
                      date: "",
                    }}
                    validationSchema={validation}
                    onSubmit={addIncome}
                  >
                    {(formik) => (
                      <Form>
                        <div className='columns'>
                          <div className='column is-6'>
                            <section className='hero round-corner has-background-white shadow'>
                              <div className='hero-body px-4 py-4'>
                                <span className='is-size-6 has-text-primary mb-1 '>
                                  Total widraw
                                </span>
                                <FastField
                                  name='wd'
                                  type='text'
                                  placeholder='Type here'
                                  className='input'
                                  onChange={formik?.handleChange("wd")}
                                />

                                <span className='error-message'>
                                  <ErrorMessage name='wd' />
                                </span>
                                <h1 className='title is-size-5 has-text-primary'>
                                  ETH
                                </h1>
                              </div>
                            </section>
                          </div>
                          <div className='column is-6'>
                            <section className='hero round-corner has-background-white shadow'>
                              <div className='hero-body px-4 py-4'>
                                <span className='is-size-6 has-text-primary mb-1 '>
                                  Fee
                                </span>
                                <FastField
                                  name='fee'
                                  type='text'
                                  step='any'
                                  min='0'
                                  placeholder='Type here'
                                  className='input'
                                  onChange={formik?.handleChange("fee")}
                                />

                                <span className='error-message'>
                                  <ErrorMessage name='fee' />
                                </span>
                                <h1 className='title is-size-5 has-text-primary'>
                                  ETH
                                </h1>
                              </div>
                            </section>
                          </div>
                        </div>
                        <section className='hero round-corner has-background-white shadow'>
                          <div className='hero-body px-4 py-4'>
                            <div className='columns'>
                              <div className='column is-9'>
                                <span className='is-size-6 has-text-primary mb-1'>
                                  Date
                                </span>
                                <FastField
                                  type='date'
                                  name='date'
                                  placeholder='Type here'
                                  className='input'
                                  onChange={formik?.handleChange("date")}
                                />

                                <span className='error-message'>
                                  <ErrorMessage name='date' />
                                </span>
                              </div>
                              <div className='column is-3'>
                                <Gap height={22} />
                                <Button
                                  color='is-info'
                                  isLoading={isLoading}
                                  type='submit'
                                  label='Submit'
                                />
                              </div>
                            </div>
                          </div>
                        </section>
                      </Form>
                    )}
                  </Formik>
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
