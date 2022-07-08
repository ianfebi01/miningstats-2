import React, { useState, useEffect, useRef } from 'react';
import { BarChart } from '../../atoms';
import { Chart as ChartJS } from 'chart.js/auto';
import { API } from '../../../utils/API';
import { convertMonth } from '../../../utils/ConvertMonth';

const Statistic = ({ data }) => {
  return (
    <section className="hero is-medium round-corner has-background-white overview py-2">
      <div className="hero-body py-4 px-5">
        <ul className="is-flex">
          <li>
            <h1 className="title has-text-primary">Statistic</h1>
          </li>
        </ul>
        <BarChart
          data={data}
          options={{
            title: {
              display: true,
              text: 'gg',
            },
          }}
        />
      </div>
    </section>
  );
};

export default Statistic;
