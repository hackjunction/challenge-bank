import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import './style.css';

class Lander extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="flexrow lander-flex">
          <div className="events">
            <h4 className="landertitle">Upcoming events</h4>
            <div className="underline" />
            <div className="grid">
              <div className="griditem">
                <p>12.-12.12.</p>
                <p>Tampere</p>
              </div>
              <div className="griditem">
                <p>12.-12.12.</p>
                <p>Tampere</p>
              </div>
              <div className="griditem">
                <p>12.-12.12.</p>
                <p>Tampere</p>
              </div>
              <div className="griditem">
                <p>12.-12.12.</p>
                <p>Tampere</p>
              </div>
            </div>
          </div>
          <div className="cities">
            <h4 className="landertitle">Current standings</h4>
            <div className="underline" />
          </div>
        </div>
      </div>
    );
  }
}

export default Lander;
