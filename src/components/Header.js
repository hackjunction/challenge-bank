import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default () => (
  <div className="header">
    <div className="header-content">
      <Link to={`/`}>
        <h2>Challenge Bank</h2>
      </Link>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris risus
        lorem, commodo fringilla urna in, venenatis imperdiet mi. Vivamus luctus
        ipsum vitae enim aliquet, eget fringilla eros vulputate.{' '}
      </p>
    </div>
  </div>
);
