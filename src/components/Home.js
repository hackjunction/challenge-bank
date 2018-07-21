import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Home = ({ data: { loading, error, allChallenges } }) => {
  if (error) return <h1>Error fetching challenges!</h1>;
  if (!loading) {
    return (
      <section>
        <ul className="Home-ul">
          {allChallenges.map(challenge => (
            <li className="Home-li" key={`challenge-${challenge.id}`}>
              <Link to={`/challenge/${challenge.id}`} className="Home-link">
                <div className="Home-placeholder" />
                <h3>{challenge.name}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  return <h2>Loading challenges...</h2>;
};

export const allChallenges = gql`
  query allChallenges {
    allChallenges {
      id
      name
      shortDescription
    }
    _allChallengesMeta {
      count
    }
  }
`;

export default graphql(allChallenges)(Home);
