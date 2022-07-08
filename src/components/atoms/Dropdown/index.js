import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { convertMonth } from '../../../utils/ConvertMonth';

const Dropdown = ({ month, setSelected }) => {
  return (
    <div className="dropdown is-hoverable">
      <div className="dropdown-trigger">
        <button
          className="button mb-2 has-text-grey-primary"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span className="is-size-7">Select Month</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={faAngleDown} />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <section>
            {month.map((item) => {
              return (
                <div key={item._id.month}>
                  <a
                    className="dropdown-item"
                    onClick={() => setSelected(item._id.month)}
                  >
                    {convertMonth(item._id.month)}
                  </a>
                </div>
              );
            })}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
