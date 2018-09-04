import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default () => (
    <div className="header">
        <div className="junctionlogo" />
        <div className="container">
            <div className="row">
                <div className="header-content">
                    <Link to={`/`}>
                        <h2>Challenge Bank</h2>
                    </Link>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris risus lorem, commodo fringilla
                        urna in, venenatis imperdiet mi.
                    </p>
                </div>
            </div>
        </div>
    </div>
);
