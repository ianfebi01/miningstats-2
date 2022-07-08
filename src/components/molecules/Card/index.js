import React from 'react';
import { Dropdown, Gap } from '../../atoms';
import CardChild from '../../atoms/CardChild';

const Card = ({
  title,
  month,
  dropDownContent,
  value,
  setSelected,
  percentage,
  textPercentage,
  costsValue,
  costsMonth,
}) => {
  return (
    <section className="hero is-medium round-corner has-background-white overview py-2">
      <div className="hero-body py-4 px-5">
        <ul className="is-flex">
          <li>
            <h1 className="title has-text-primary">{title}</h1>
          </li>
          <li className="mr-1 ml-auto">
            {/* Dropdown */}
            <Dropdown month={dropDownContent} setSelected={setSelected} />
          </li>
        </ul>
        <section className="hero round-corner has-background-light">
          <div className="hero-body py-4 px-5">
            <div className="columns">
              <div className="column is-6">
                <CardChild
                  backgroundColor="has-background-white"
                  shadow="shadow"
                  month={month}
                  value={value}
                  percentage={percentage}
                  textPercentage={textPercentage}
                />
              </div>
              <div className="column is-6">
                <CardChild month={costsMonth} value={costsValue} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Card;
