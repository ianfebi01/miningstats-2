import React from 'react';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PrevNext = () => {
  return (
    <section className="hero next-prev">
      <div className="hero-body py-4 px-5">
        <ul className="has-text-primary">
          <li>
            <FontAwesomeIcon className="is-size-4" icon={faArrowLeft} />
          </li>
          <li>Prev</li>
          <li>
            <FontAwesomeIcon className="is-size-4" icon={faArrowRight} />
          </li>
          <li>Next</li>
        </ul>
      </div>
    </section>
  );
};

export default PrevNext;
