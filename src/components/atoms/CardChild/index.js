import React from 'react';
import { convertMonth } from '../../../utils/ConvertMonth';
import './CardChild.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { text } from '@fortawesome/fontawesome-svg-core';

const CardChild = ({
  backgroundColor,
  shadow,
  month,
  value,
  percentage,
  textPercentage,
}) => {
  return (
    <section
      className={`hero round-corner card-child ${backgroundColor} ${shadow}`}
    >
      <div className="hero-body px-4 py-5">
        <ul className="is-flex">
          <li>
            <h1 className="is-size-6 has-text-primary">{month}</h1>
          </li>
          {percentage ? (
            <li className="mr-1 ml-auto">
              <div
                className={`box-percentage is-size-7 ${
                  textPercentage < 0
                    ? 'percentage-down'
                    : textPercentage === 0
                    ? ''
                    : textPercentage > 0
                    ? 'percentage-up'
                    : ''
                }`}
              >
                {textPercentage < 0 ? (
                  <FontAwesomeIcon icon={faArrowDown} />
                ) : textPercentage === 0 ? (
                  ''
                ) : (
                  <FontAwesomeIcon icon={faArrowUp} />
                )}
                {textPercentage}%
              </div>
            </li>
          ) : (
            ''
          )}
        </ul>
        <h1 className="title is-size-2 has-text-primary my-2">{value}</h1>
        <h1 className="title is-size-5 has-text-primary">ETH</h1>
      </div>
    </section>
  );
};

export default CardChild;
