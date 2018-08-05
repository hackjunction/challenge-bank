import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Home = ({ data: { loading, error, allChallenges } }) => {
  if (error) return <h1>Error fetching challenges!</h1>;
  if (!loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="grid">
            {allChallenges.map(challenge => (
              <div className="grid-item" key={`challenge-${challenge.id}`}>
                <div className="grid-content">
                  <div className="flexrow">
                    <p
                      className="category"
                      style={{
                        color: `rgba(${Object.values(
                          JSON.parse(challenge.challengeCategory.color)
                        ).join(',')})`
                      }}
                    >
                      <b>{challenge.challengeCategory.name}</b>
                    </p>
                    <p className="difficulty">
                      {challenge.challengeDifficulty.name}
                    </p>
                  </div>
                  <h5>
                    <b>{challenge.name}</b>
                  </h5>
                  <p>{challenge.shortDescription}</p>
                </div>
                <div className="flexrow">
                  <Link to={`/challenge/${challenge.id}`} className="grid-link">
                    See Details >
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
      challengeCategory {
        name
        color
      }
      challengeDifficulty {
        name
      }
    }
    _allChallengesMeta {
      count
    }
  }
`;

export default graphql(allChallenges)(Home);
