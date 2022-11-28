import axios from "axios";
import { Form, Formik, FastField, ErrorMessage } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Gap, Input, Navbar, Title } from "../../components";
import { getAllCosts, saveCost } from "../../features/costsAllSlice";
import { API } from "../../utils/API";
import * as Yup from "yup";

const AddCost = ({ axiosJWT, token }) => {
  const [isLoading, setIsLoading] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const addCost = async (values, submitProps) => {
    setIsLoading("is-loading");

    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cost`, {
      userId: user.id,
      detail: values.detail,
      price: values.price,
      date: values.date,
    });
    setIsLoading("");
    submitProps.resetForm();
  };

  const validation = Yup.object({
    detail: Yup.string().required("Detail is required"),
    price: Yup.string()
      .required("Price is required")
      .matches(/^\d*\.?\d*$/, "Only accept valid number"),
    date: Yup.string().required("Date is required"),
  });
  return (
    <div>
      <Navbar />
      <section className='hero is-small '>
        <div className='hero-body has-text-centered'>
          <Title textTitle='Add Cost' />
        </div>
      </section>
      <div className='columns is-centered'>
        <div className='column is-6 '>
          <section className='hero is-medium round-corner has-background-white overview hero-income'>
            <div className='hero-body py-4 px-5 '>
              <ul className='is-flex'>
                <li>
                  <h1 className='title has-text-primary'>Add Cost</h1>
                </li>
              </ul>
              <section className='hero round-corner has-background-light hero-income-2 mt-4'>
                <div className='hero-body px-4 py-5'>
                  <Formik
                    enableReinitialize
                    initialValues={{
                      detail: "",
                      price: "",
                      date: "",
                    }}
                    validationSchema={validation}
                    onSubmit={addCost}
                  >
                    {(formik) => (
                      <Form>
                        <div className='columns'>
                          <div className='column is-6'>
                            <section className='hero round-corner has-background-white shadow'>
                              <div className='hero-body px-4 py-4'>
                                {/* <Input
                              label='Detail'
                              placeholder='Type here'
                              type='text'
                              className='input my-2 round-button'
                              value={detail}
                              onChange={(e) => setDetail(e.target.value)}
                            /> */}
                                <span className='is-size-6 has-text-primary mb-1'>
                                  Detail
                                </span>
                                <FastField
                                  name='detail'
                                  type='text'
                                  placeholder='Type here'
                                  className='input round-button'
                                  onChange={formik?.handleChange("detail")}
                                />

                                <span className='error-message'>
                                  <ErrorMessage name='detail' />
                                </span>
                                <Gap height={18.5} />
                              </div>
                            </section>
                          </div>
                          <div className='column is-6'>
                            <section className='hero round-corner has-background-white shadow'>
                              <div className='hero-body px-4 py-4'>
                                <span className='is-size-6 has-text-primary mb-1'>
                                  Price(on ETH)
                                </span>
                                <FastField
                                  name='price'
                                  type='text'
                                  placeholder='Type here'
                                  className='input'
                                  onChange={formik?.handleChange("price")}
                                />

                                <span className='error-message'>
                                  <ErrorMessage name='price' />
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

export default AddCost;
