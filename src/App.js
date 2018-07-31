import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import _ from 'lodash';

//Test component
class App extends Component {

  renderChallenges() {
    const challenges = this.props.data.allChallenges;

    return _.map(challenges, (challenge) => {
      return(
        <div key={challenge.id}>
           <h1>{challenge.name}</h1>
           <p>{challenge.shortDescription}</p>
        </div>
      );
    });
  }

  render() {

    const {loading, error } = this.props.data;

    if (loading) {
      return(
        <div className="App">
          <h1>{'Loading...'}</h1>
        </div>
      );
    }

    if (error) {
      return(
        <div className="App">
          <h1>{'Error'}</h1>
        </div>
      );
    }

    return (
      <div className="App">
        <h1>{'Total challenges: ' + this.props.data._allChallengesMeta.count}</h1>
        {this.renderChallenges()}
      </div>
    );
  }
}

export const allChallenges = gql`
  query allChallenges {
    allChallenges {
      id
      name
      shortDescription
      challengeCategory {
        name
        color
      }
      challengeDifficulty {
        name
        difficultyvalue
      }
    },
    _allChallengesMeta {
      count
    }
  }
`;

export default graphql(allChallenges)(App);
