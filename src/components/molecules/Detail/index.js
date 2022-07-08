import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API } from '../../../utils/API';
import { useState } from 'react';
import { useEffect } from 'react';
import ReadOnlyRow from '../ReadOnlyRow.js';

const handleClickAddDetail = () => {};

const Detail = ({ axiosJWT, token, selected }) => {
  const [cost, setCost] = useState([]);
  const [id, setId] = useState('');
  const [detail, setDetail] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [userId, setUserId] = useState(sessionStorage.getItem('userId'));

  return (
    <section className="hero detail-cost round-corner has-background-white">
      <div className="hero-body py-4 px-5">
        <div className="title-underline is-flex">
          <h1 className="has-text-primary ">Detail Cost</h1>
        </div>
        <div className="box-table">
          <form action="#">
            <table className="table has-text-primary is-size-7 is-fullwidth is-hoverable">
              <ReadOnlyRow
                axiosJWT={axiosJWT}
                token={token}
                selected={selected}
              />
            </table>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Detail;
