import React from 'react';
import { NavLink } from 'react-router-dom';
import Gap from '../Gap';
import './Link.scss';

const Link = ({ label, link, linkLabel }) => {
  return (
    <div className="link-wrapper">
      <p>{label}</p>
      <Gap width={5} />
      <NavLink to={link}> {linkLabel}</NavLink>
    </div>
  );
};

export default Link;
